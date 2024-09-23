package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.repository.PostDogRepository;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.PostException;
import com.easteregg.ifsae.global.exception.type.ShelterException;
import com.easteregg.ifsae.global.video.VideoUploadService;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostDogRepository postDogRepository;
    private final ShelterRepository shelterRepository;
    private final VideoUploadService videoUploadService;
    private final DogRepository dogRepository;

    /**
     * [공사중]
     * 포스트 일부 잘라서 가져오는 메서드
     * Data 친구들 구현에 따라서 바뀔 예정
     * @param pageable
     * @return Slice&lt;Post&gt;객체
     */
    @Override
    public Slice<Post> getPostSlice(Pageable pageable) {
        return postRepository.findPostsBy(pageable);
    }

    /**
     * Post 1개 읽는 메서드
     * @param postId
     * @return
     */
    @Override
    public PostDto.Response read(Long postId) {
        Optional<Post> postOptional = postRepository.findPostById(postId);
        Post post = postOptional.orElseThrow(() -> new PostException(ErrorCode.POST_NOT_FOUND));
        return post.toResponseDto();
    }

    /**
     * Post 생성 메서드
     * @param request
     * @param multipartFile
     */
    @Transactional
    @Override
    public Long create(PostDto.Request request, MultipartFile multipartFile) {
        // Shelter에 저장
        Long shelterId = request.getShelterId();
        Optional<Shelter> shelterOptional = shelterRepository.findById(shelterId);
        Shelter shelter = shelterOptional.orElseThrow(() -> new ShelterException(ErrorCode.SHELTER_NOT_FOUND));

        // 비디오 압축 및 저장
        String fileUrl = videoUploadService.compressAndUploadVideo(multipartFile);

        // Request객체로부터 Post객체 생성 및 영속화
        Post post = request.toEntity(fileUrl, shelter);
        Post savedPost = postRepository.save(post);

        // PostDog에 저장
        List<Long> dogIds = request.getDogIds();

        // Request의 dogIds로부터 Dog객체 조회
        List<Dog> dogs = dogRepository.findByIdIn(dogIds);

        // PostDog객체 리스트 생성
        List<PostDog> postDogs = dogs.stream()
                .map(dog -> PostDog.builder()
                        .post(savedPost)
                        .dog(dog)
                        .build())
                .toList();

        // PostDog 영속화
        postDogRepository.saveAll(postDogs);
        return savedPost.getId();
    }

    /**
     * Post 업데이트 메서드
     * @param postId
     * @param request
     */
    @Override
    public void update(Long postId, PostDto.UpdateRequest request) {
        // Post 조회
        Optional<Post> postOptional = postRepository.findPostById(postId);
        Post post = postOptional.orElseThrow(() -> new PostException(ErrorCode.POST_NOT_FOUND));

        // 기존 포스트에 업데이트
        Post updatedPost = request.toEntity(post);

        // PostDog 확인
        List<PostDog> postDogs = postDogRepository.findByIdIn(request.getDogIds());
        // PostDog 업데이트
        updatedPost.updateDogs(postDogs);

        postRepository.save(post);
    }

    /**
     * Post Delete 메서드
     * @param postId
     */
    @Override
    public void delete(Long postId) {
        postRepository.deleteById(postId);
    }
}
