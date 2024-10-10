package com.easteregg.ifsae.domain.adoption.service;

import static com.easteregg.ifsae.domain.adoption.type.AdoptionStatus.ACCEPTED;
import static com.easteregg.ifsae.domain.adoption.type.AdoptionStatus.REJECTED;
import static com.easteregg.ifsae.domain.adoption.type.AdoptionStatus.WAITING;
import static com.easteregg.ifsae.global.exception.ErrorCode.ADOPTION_NOT_FOUND;
import static com.easteregg.ifsae.global.exception.ErrorCode.ADOPTION_NOT_WAITING;
import static com.easteregg.ifsae.global.exception.ErrorCode.DOG_NOT_FOUND;
import static com.easteregg.ifsae.global.exception.ErrorCode.SHELTER_PERMISSION_DENIED;

import com.easteregg.ifsae.domain.adoption.dto.AdoptionApplierListDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionCreateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionDetailDto;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionShelterListRes;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUpdateRequest;
import com.easteregg.ifsae.domain.adoption.dto.AdoptionUserListRes;
import com.easteregg.ifsae.domain.adoption.entity.Adoption;
import com.easteregg.ifsae.domain.adoption.repository.AdoptionRepository;
import com.easteregg.ifsae.domain.adoption.type.AdoptionStatus;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterDogRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.domain.user.entity.UserProfile;
import com.easteregg.ifsae.domain.user.repository.UserProfileRepository;
import com.easteregg.ifsae.global.elasticsearch.service.ESDogService;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.AdoptionException;
import com.easteregg.ifsae.global.exception.type.DogException;
import com.easteregg.ifsae.global.exception.type.ShelterUserException;
import com.easteregg.ifsae.global.exception.type.UserException;
import jakarta.transaction.Transactional;
import java.time.LocalDateTime;
import java.util.List;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class AdoptionServiceImpl implements AdoptionService {

    private final AdoptionRepository adoptionRepository;
    private final DogRepository dogRepository;
    private final ShelterRepository shelterRepository;
    private final ShelterUserRepository shelterUserRepository;
    private final ShelterDogRepository shelterDogRepository;
    private final UserProfileRepository userProfileRepository;
    private final ESDogService esDogService;

    @Override
    public void createAdoption(User user, AdoptionCreateRequest adoptionCreateRequest) {
        Dog dog = dogRepository.findById(adoptionCreateRequest.getDogId())
                               .orElseThrow(() -> new DogException(DOG_NOT_FOUND));

        Shelter shelter = dog.getShelterDog().getShelter();

        Adoption adoption = Adoption.builder()
                                    .user(user)
                                    .dog(dog)
                                    .shelter(shelter)
                                    .adoptionPurpose(adoptionCreateRequest.getAdoptionPurpose())
                                    .absencePlan(adoptionCreateRequest.getAbsencePlan())
                                    .adoptionStatus(WAITING)
                                    .createdAt(LocalDateTime.now())
                                    .build();

        adoptionRepository.save(adoption);
    }

    @Override
    public List<AdoptionShelterListRes> getShelterAdoptionList(User user) {
        Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                                               // 쉘터가 없을 경우 예외처리
                                               .orElseThrow(() -> new ShelterUserException(ErrorCode.SHELTER_NOT_FOUND))
                                               .getShelter();

        List<Adoption> adoptionList = adoptionRepository.findAdoptionsByShelterId(shelter.getId());

        return adoptionList.stream()
                           .map(AdoptionShelterListRes::fromAdoption)
                           .toList();
    }

    @Override
    public List<AdoptionUserListRes> getUserAdoptionList(User user) {
        List<Adoption> adoptionList = adoptionRepository.findAdoptionsByUserId(user.getId());

        return adoptionList.stream()
                           .map(AdoptionUserListRes::fromAdoption)
                           .toList();
    }

    @Override
    public void updateAdoption(User user, long adoptionId, AdoptionUpdateRequest adoptionUpdateRequest) {
        Adoption adoption = adoptionRepository.findById(adoptionId)
                                              .orElseThrow(() -> new AdoptionException(ADOPTION_NOT_FOUND));

        if (!adoption.getUser().getId().equals(user.getId())) {
            throw new UserException(ErrorCode.UNAUTHORIZED);
        }

        adoption.updateAdoption(adoptionUpdateRequest);

        adoptionRepository.save(adoption);
    }

    @Override
    public void acceptAdoption(User user, Long adoptionId) {
        Adoption adoption = validateAdoptionAndShelter(user, adoptionId);

        adoption.updateAdoptionStatus(ACCEPTED);
        adoptionRepository.save(adoption);

        // 입양 신청한 유저가 쉘터로 등록되어 있는지 확인
        Shelter shelter = shelterUserRepository.findByUserId(adoption.getUser().getId())
                                               .map(ShelterUser::getShelter)
                                               .orElseGet(() -> {
                                                   // 쉘터가 없을 경우 새로운 쉘터를 생성하고 저장
                                                   Shelter newShelter = Shelter.builder()
                                                                               .name(adoption.getUser().getNickname())
                                                                               .canBeDonated(false)
                                                                               .build();
                                                   shelterRepository.save(newShelter);

                                                   // 새로운 쉘터와 사용자를 연결하는 ShelterUser 생성 및 저장
                                                   ShelterUser newShelterUser = ShelterUser.builder()
                                                                                           .user(adoption.getUser())
                                                                                           .shelter(newShelter)
                                                                                           .build();
                                                   shelterUserRepository.save(newShelterUser);

                                                   return newShelter;
                                               });

        Dog dog = dogRepository.findById(adoption.getDog().getId())
                               .orElseThrow(() -> new DogException(DOG_NOT_FOUND));

        // 개 소속 쉘터 변경
        ShelterDog shelterDog = dog.getShelterDog();
        shelterDog.updateShelter(shelter);
        shelterDogRepository.save(shelterDog);

        // 개 입양 상태 변경
        dog.updateDogStatus(DogStatus.ADOPTED);
        dogRepository.save(dog);

        esDogService.updateDog(dog);
    }

    @Override
    public void rejectAdoption(User user, Long adoptionId) {
        Adoption adoption = validateAdoptionAndShelter(user, adoptionId);

        adoption.updateAdoptionStatus(REJECTED);
        adoptionRepository.save(adoption);
    }

    @Override
    public AdoptionDetailDto findById(User user, long adoptionId) {
        Adoption adoption = adoptionRepository.findById(adoptionId)
                                              .orElseThrow(() -> new AdoptionException(ADOPTION_NOT_FOUND));

        User applier = adoption.getUser();
        UserProfile userProfile = userProfileRepository.findByUserId(applier.getId())
                                                       .orElse(UserProfile.builder().build());

        Dog dog = adoption.getDog();
        Shelter shelter = dog.getShelterDog().getShelter();
        List<ShelterUser> shelterEmpList = shelterUserRepository.findAllByShelterId(shelter.getId());

        for (ShelterUser shelterUser : shelterEmpList) {
            if (shelterUser.getUser().getId().equals(user.getId())) {
                return AdoptionDetailDto.builder()
                                        .id(adoptionId)
                                        .userProfile(userProfile.toDto())
                                        .dogList(dog.toDogListDto())
                                        .adoptionPurpose(adoption.getAdoptionPurpose())
                                        .absencePlan(adoption.getAbsencePlan())
                                        .adoptionStatus(adoption.getAdoptionStatus())
                                        .build();
            }
        }

        throw new UserException(ErrorCode.UNAUTHORIZED);
    }

    @Override
    public List<AdoptionApplierListDto> findUsersByDogId(User user, long dogId) {
        List<Adoption> adoptions = adoptionRepository.findAdoptionsByDogId(dogId);

        Dog dog = dogRepository.findById(dogId)
                               .orElseThrow(() -> new DogException(DOG_NOT_FOUND));

        Shelter shelter = dog.getShelterDog().getShelter();
        List<ShelterUser> shelterEmpList = shelterUserRepository.findAllByShelterId(shelter.getId());
        for (ShelterUser shelterUser : shelterEmpList) {
            if (shelterUser.getUser().getId().equals(user.getId())) {
                return adoptions.stream()
                                .map(adoption -> AdoptionApplierListDto.fromUser(adoption.getId(), adoption.getUser()))
                                .toList();
            }
        }

        throw new UserException(ErrorCode.UNAUTHORIZED);
    }

    private Adoption validateAdoptionAndShelter(User user, Long adoptionId) {
        return adoptionRepository.findById(adoptionId)
                                 .map(foundAdoption -> {
                                     // 입양 상태가 WAITING이 아닐 경우 에러
                                     if (foundAdoption.getAdoptionStatus() != AdoptionStatus.WAITING) {
                                         throw new AdoptionException(ADOPTION_NOT_WAITING);
                                     }

                                     Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                                                                            // 쉘터가 없을 경우 예외처리
                                                                            .orElseThrow(() -> new ShelterUserException(
                                                                                    ErrorCode.SHELTER_NOT_FOUND))
                                                                            .getShelter();

                                     // 입양 신청서 대상 쉘터와 관리자의 소속 쉘터가 다를 경우 에러
                                     if (!shelter.getId().equals(foundAdoption.getShelter().getId())) {
                                         throw new AdoptionException(SHELTER_PERMISSION_DENIED);
                                     }

                                     return foundAdoption;
                                 })
                                 // 입양 정보가 조회되지 않을 경우 에러
                                 .orElseThrow(() -> new AdoptionException(ADOPTION_NOT_FOUND));
    }
}