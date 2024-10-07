package com.easteregg.ifsae.domain.dog.service;

import static com.easteregg.ifsae.global.exception.ErrorCode.DOG_NOT_FOUND;
import static com.easteregg.ifsae.global.exception.ErrorCode.DOG_NOT_FOUND_IN_SHELTER;
import static com.easteregg.ifsae.global.exception.ErrorCode.SHELTER_NOT_FOUND;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.follow.entity.Follow;
import com.easteregg.ifsae.domain.follow.repository.FollowRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.domain.shelter.repository.ShelterDogRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.elasticsearch.service.ESDogService;
import com.easteregg.ifsae.global.exception.type.DogException;
import com.easteregg.ifsae.global.exception.type.ShelterException;
import com.easteregg.ifsae.global.s3.S3ImageUploader;
import jakarta.transaction.Transactional;
import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {

    private final DogRepository dogRepository;
    private final ShelterUserRepository shelterUserRepository;
    private final ShelterDogRepository shelterDogRepository;
    private final FollowRepository followRepository;
    private final S3ImageUploader s3ImageUploader;
    private final ESDogService esDogService;


    @Override
    public void createDog(User user, DogCreateRequest dogCreateRequest, MultipartFile dogImage) throws IOException {
        Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                                               .orElseThrow(() -> new ShelterException(SHELTER_NOT_FOUND))
                                               .getShelter();

        Dog dog = Dog.builder()
                     .name(dogCreateRequest.getName())
                     .age(dogCreateRequest.getAge())
                     .gender(Gender.valueOf(dogCreateRequest.getGender()))
                     .dogStatus(DogStatus.valueOf(dogCreateRequest.getDogStatus()))
                     .species(dogCreateRequest.getSpecies())
                     .info(dogCreateRequest.getInfo())
                     .build();

        String imageUrl = s3ImageUploader.upload(dogImage);
        dog.updateDogProfileImage(imageUrl);

        ShelterDog shelterDog = ShelterDog.builder()
                                          .shelter(shelter)
                                          .dog(dog)
                                          .build();

        dog.updateShelterDog(shelterDog);

        dogRepository.save(dog);

        shelterDogRepository.save(shelterDog);

        esDogService.saveDog(dog);

    }

    @Override
    public void updateDogProfileImage(MultipartFile dogImage, Dog dog) throws IOException {
        String imageUrl = s3ImageUploader.upload(dogImage);

        dog.updateDogProfileImage(imageUrl);
    }

    @Override
    public void updateDog(long dogId, DogCreateRequest dogCreateRequest) {
        Dog dog = dogRepository.findById(dogId)
                               .orElseThrow(() -> new DogException(DOG_NOT_FOUND));

        dog.updateDogInfo(dogCreateRequest);

        esDogService.updateDog(dog);
    }

    @Override
    public DogDetailDto findById(long dogId) {
        Dog dog = dogRepository.findById(dogId)
                               .orElseThrow(() -> new DogException(DOG_NOT_FOUND));

        ShelterDog shelterDog = shelterDogRepository.findShelterDogsByDogId(dogId)
                                                    .orElseThrow(() -> new DogException(DOG_NOT_FOUND_IN_SHELTER));

        Shelter shelter = shelterDog.getShelter();

        return DogDetailDto.builder()
                           .id(dog.getId())
                           .name(dog.getName())
                           .age(dog.getAge())
                           .gender(dog.getGender())
                           .dogStatus(dog.getDogStatus())
                           .species(dog.getSpecies())
                           .info(dog.getInfo())
                           .image(dog.getImage())
                           .shelterId(shelter.getId())
                           .shelterName(shelter.getName())
                           .followerCnt(dog.getFollows().size())
                           .build();
    }

    @Override
    public List<DogListDto> findDogsByShelterId(long shelterId) {
        List<ShelterDog> shelterDogs = shelterDogRepository.findShelterDogsByShelterId(shelterId);

        List<Dog> dogs = dogRepository.findDogsByShelterDogIn(shelterDogs);

        return dogs.stream()
                   .map(Dog::toDogListDto).collect(Collectors.toList());
    }

    @Override
    public List<DogListDto> findDogsByFollowerId(long followerId) {
        List<Follow> followList = followRepository.findFollowsByUserId(followerId);

        List<Dog> dogs = followList.stream()
                                   .map(Follow::getDog).toList();

        return dogs.stream().map(Dog::toDogListDto).collect(Collectors.toList());
    }
}