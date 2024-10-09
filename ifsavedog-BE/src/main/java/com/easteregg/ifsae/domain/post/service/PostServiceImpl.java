package com.easteregg.ifsae.domain.post.service;

import com.easteregg.ifsae.domain.dog.entity.Dog;
import com.easteregg.ifsae.domain.dog.repository.DogRepository;
import com.easteregg.ifsae.domain.post.dto.PostDto;
import com.easteregg.ifsae.domain.post.dto.PostDto.PostPreview;
import com.easteregg.ifsae.domain.post.entity.Post;
import com.easteregg.ifsae.domain.post.entity.PostDog;
import com.easteregg.ifsae.domain.post.entity.PostLike;
import com.easteregg.ifsae.domain.post.repository.PostDogRepository;
import com.easteregg.ifsae.domain.post.repository.PostLikeRepository;
import com.easteregg.ifsae.domain.post.repository.PostRepository;
import com.easteregg.ifsae.domain.shelter.entity.Shelter;
import com.easteregg.ifsae.domain.shelter.entity.ShelterUser;
import com.easteregg.ifsae.domain.shelter.repository.ShelterRepository;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.exception.ErrorCode;
import com.easteregg.ifsae.global.exception.type.PostException;
import com.easteregg.ifsae.global.exception.type.ShelterException;
import com.easteregg.ifsae.global.exception.type.ShelterUserException;
import com.easteregg.ifsae.global.video.VideoUploadService;
import com.easteregg.ifsae.global.video.entity.CompressedVideoUrlSet;
import jakarta.transaction.Transactional;
import java.util.List;
import java.util.Objects;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

@Slf4j
@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final PostDogRepository postDogRepository;
    private final ShelterRepository shelterRepository;
    private final ShelterUserRepository shelterUserRepository;
    private final VideoUploadService videoUploadService;
    private final DogRepository dogRepository;
    private final PostLikeRepository postLikeRepository;

    @Override
    public Slice<Post> getPostSlice(User user, Pageable pageable) {


        return postRepository.findPostsBy(pageable);
    }

    @Override
    public PostDto.Response read(Long postId) throws PostException {
        Post post = findPostById(postId);
        return post.toResponseDto();
    }

    @Transactional
    @Override
    public Long create(User user, PostDto.Request request, MultipartFile multipartFile) {
        // 쉘터 및 사용자 확인
        Shelter shelter = findShelterAndCheckUser(user, request.getShelterId());

        // 비디오 압축 및 저장
        CompressedVideoUrlSet urlSet = videoUploadService.compressAndUploadVideo(multipartFile);

        // Post 생성 및 저장
        Post savedPost = createAndSavePost(request, urlSet, shelter);

        // PostDog 연결 및 저장
        savePostDogs(savedPost, request.getDogIds());

        return savedPost.getId();
    }

    @Override
    public void update(User user, Long postId, PostDto.UpdateRequest request) {
        Post post = findPostById(postId);
        checkUserInShelter(user, post.getShelter().getId());

        // Post 업데이트
        Post updatedPost = request.toEntity(post);
        List<PostDog> postDogs = findPostDogsByIds(request.getDogIds());
        updatedPost.updateDogs(postDogs);

        postRepository.save(updatedPost);
    }

    @Override
    public void delete(User user, Long postId) {
        checkUserInShelter(user, findPostById(postId).getShelter().getId());
        postRepository.deleteById(postId);
    }

    @Override
    public List<PostPreview> getPostList(Long dogId) {

        List<PostDog> postDogList = postDogRepository.findByDogId(dogId);

        List<Post> PostList = postRepository.findPostsByDogsIn(postDogList);

        return PostList.stream()
                       .map(post -> PostDto.PostPreview.builder()
                                                       .id(post.getId())
                                                       .title(post.getTitle())
                                                       .imageUrl(post.getThumbnailUrl())
                                                       .build())
                       .toList();
    }

    @Override
    public List<PostPreview> getPostListByLike(Long userId) {

        List<PostLike> postLikeList = postLikeRepository.findByUserId(userId);

        List<Post> postList = postRepository.findPostsByLikesIn(postLikeList);

        return postList.stream()
                       .map(post -> PostDto.PostPreview.builder()
                                                       .id(post.getId())
                                                       .title(post.getTitle())
                                                       .imageUrl(post.getThumbnailUrl())
                                                       .build())
                       .toList();
    }

    @Override
    public void createLike(User user, long postId) {
        Post post = findPostById(postId);
        postLikeRepository.save(new PostLike(user, post));

        post.addLikeCnt();
        postRepository.save(post);
    }

    @Override
    public void deleteLike(User user, long postId) {
        PostLike postLike = postLikeRepository.findByUserIdAndPostId(user.getId(), postId)
                                              .orElseThrow(() -> new PostException(ErrorCode.INVALID_PAGE_REQUEST));
        postLikeRepository.delete(postLike);

        Post post = findPostById(postId);
        post.removeLikeCnt();
        postRepository.save(post);
    }

    @Override
    public boolean checkPostLike(User user, long postId) {
        return postLikeRepository.findByUserIdAndPostId(user.getId(), postId).isPresent();
    }

    /**
     * Post를 ID로 조회하는 헬퍼 메서드
     */
    private Post findPostById(Long postId) {
        return postRepository.findPostById(postId)
                             .orElseThrow(() -> new PostException(ErrorCode.INVALID_PAGE_REQUEST));
    }

    /**
     * Shelter 및 사용자 권한 확인 헬퍼 메서드
     */
    private Shelter findShelterAndCheckUser(User user, Long shelterId) {
        checkUserInShelter(user, shelterId);
        return shelterRepository.findById(shelterId)
                                .orElseThrow(() -> new ShelterException(ErrorCode.SHELTER_NOT_FOUND));
    }

    /**
     * Post를 생성하고 저장하는 헬퍼 메서드
     */
    private Post createAndSavePost(PostDto.Request request, CompressedVideoUrlSet urlSet, Shelter shelter) {
        Post post = request.toEntity(urlSet, shelter);
        return postRepository.save(post);
    }

    /**
     * PostDog 리스트를 생성하고 저장하는 헬퍼 메서드
     */
    private void savePostDogs(Post post, List<Long> dogIds) {
        List<Dog> dogs = dogRepository.findByIdIn(dogIds);
        List<PostDog> postDogs = dogs.stream()
                                     .map(dog -> PostDog.builder()
                                                        .post(post)
                                                        .dog(dog)
                                                        .build())
                                     .toList();
        postDogRepository.saveAll(postDogs);
    }

    /**
     * PostDog 리스트를 ID로 조회하는 헬퍼 메서드
     */
    private List<PostDog> findPostDogsByIds(List<Long> dogIds) {
        return postDogRepository.findByIdIn(dogIds);
    }

    /**
     * 유저가 쉘터에 속해있는지 확인하는 메서드
     */
    private void checkUserInShelter(User user, Long shelterId) {
        ShelterUser shelterUser = shelterUserRepository.findByUserId(user.getId())
                                                       .orElseThrow(() -> new ShelterUserException(
                                                               ErrorCode.USER_NOT_FOUND_IN_SHELTER));

        if (!Objects.equals(shelterUser.getShelter().getId(), shelterId)) {
            throw new ShelterUserException(ErrorCode.USER_NOT_FOUND_IN_SHELTER);
        }
    }
}