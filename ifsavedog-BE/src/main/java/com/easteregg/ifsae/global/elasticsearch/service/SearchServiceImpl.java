package com.easteregg.ifsae.global.elasticsearch.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
import com.easteregg.ifsae.domain.shelter.repository.ShelterUserRepository;
import com.easteregg.ifsae.domain.user.entity.User;
import com.easteregg.ifsae.global.elasticsearch.index.ESDog;
import com.easteregg.ifsae.global.elasticsearch.index.ESPost;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchServiceImpl implements SearchService {
    private final ElasticsearchClient elasticsearchClient;
    private final ShelterUserRepository shelterUserRepository;

    @Override
    public List<Long> searchDogs(String query, User user) throws IOException {
        // 사용자의 쉼터 ID 가져오기
        Long shelterId = shelterUserRepository.findByUserId(user.getId())
                .map(shelterUser -> shelterUser.getShelter().getId())
                .orElseThrow(() -> new RuntimeException("No Shelter associated with this user"));

    /*
    개 검색 조건
        - name
        - species
        - shelterName
     */
        Query boolQuery = BoolQuery.of(b -> {
            b.should(s -> s.multiMatch(m -> m
                    .query(query)
                    .fields("name", "species", "shelter.name")));

            b.filter(f -> f.nested(n -> n
                    .path("shelter")
                    .query(q -> q.term(t -> t.field("shelter.shelterId").value(shelterId)))));

            b.minimumShouldMatch("1");

            return b;
        })._toQuery();

        SearchResponse<ESDog> searchResponse = elasticsearchClient.search(
                s -> s.index("dog")
                        .query(boolQuery),
                ESDog.class
        );

        // dogId 리스트 반환
        return searchResponse.hits().hits().stream()
                .map(hit -> {
                    if (hit.source() != null) {
                        return Long.parseLong(hit.source().getId());
                    } else {
                        return null;
                    }
                })
                .collect(Collectors.toList());
    }

    @Override
    public List<Long> searchPosts(String query) throws IOException {
    /*
    게시글 검색 조건
        - title
        - content
        - dogName
        - shelterName
        - userNickname
     */
        Query boolQuery = BoolQuery.of(b -> {
            b.should(s -> s.multiMatch(m -> m
                    .query(query)
                    .fields("title", "content", "dogName", "shelter.name", "userNickname")));
            b.minimumShouldMatch("1");
            return b;
        })._toQuery();

        SearchResponse<ESPost> searchResponse = elasticsearchClient.search(
                s -> s.index("post")
                        .query(boolQuery),
                ESPost.class
        );

        // postId 리스트 반환
        return searchResponse.hits().hits().stream()
                .map(hit -> {
                    if (hit.source() != null) {
                        return Long.parseLong(hit.source().getId());
                    } else {
                        return null;
                    }
                })
                .collect(Collectors.toList());
    }
}