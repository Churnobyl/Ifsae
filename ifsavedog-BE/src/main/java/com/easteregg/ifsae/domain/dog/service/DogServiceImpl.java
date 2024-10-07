package com.easteregg.ifsae.domain.dog.service;

import com.easteregg.ifsae.domain.dog.dto.DogCreateRequest;
import com.easteregg.ifsae.domain.dog.dto.DogDetailDto;
import com.easteregg.ifsae.domain.dog.dto.DogListDto;
import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.entity.Species;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.dog.repository.SpeciesRepository;
import com.easteregg.ifsae.domain.dog.type.DogStatus;
import com.easteregg.ifsae.domain.dog.type.Gender;
import com.easteregg.ifsae.domain.follow.entity.Follow;
import com.easteregg.ifsae.domain.follow.repository.FollowRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterDog;
import com.easteregg.ifsae.domain.shelter.repository.ShelterDogRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.exception.type.DogException;
import com.easteregg.ifsae.global.exception.type.ShelterException;
import com.easteregg.ifsae.global.s3.S3ImageUploader;
import jakarta.transaction.Transactional;

import java.io.IOException;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import static com.easteregg.ifsae.global.exception.ErrorCode.*;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class DogServiceImpl implements DogService {
    private final DogRepository dogRepository;
    private final SpeciesRepository speciesRepository;
    private final ShelterUserRepository shelterUserRepository;
    private final ShelterDogRepository shelterDogRepository;
    private final FollowRepository followRepository;
    private final S3ImageUploader s3ImageUploader;

    @Override
    public Dog createDog(User user, DogCreateRequest dogCreateRequest) {
        Species species = speciesRepository.findByName(dogCreateRequest.getSpecies())
                .orElseThrow(() -> new DogException(SPECIES_NOT_FOUND));

        Shelter shelter = shelterUserRepository.findByUserId(user.getId())
                .orElseThrow(() -> new ShelterException(SHELTER_NOT_FOUND))
                .getShelter();

        Dog dog = Dog.builder()
                .name(dogCreateRequest.getName())
                .age(dogCreateRequest.getAge())
                .gender(Gender.valueOf(dogCreateRequest.getGender()))
                .dogStatus(DogStatus.valueOf(dogCreateRequest.getDogStatus()))
                .species(species)
                .info(dogCreateRequest.getInfo())
                .build();

        ShelterDog shelterDog = ShelterDog.builder()
                .shelter(shelter)
                .dog(dog)
                .build();

        shelterDogRepository.save(shelterDog);

        return dogRepository.save(dog);
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
                .species(dog.getSpecies().getName())
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