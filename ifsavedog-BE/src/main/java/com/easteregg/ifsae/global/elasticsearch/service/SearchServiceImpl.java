package com.easteregg.ifsae.global.elasticsearch.service;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.elasticsearch._types.query_dsl.BoolQuery;
import co.elastic.clients.elasticsearch._types.query_dsl.Query;
import co.elastic.clients.elasticsearch.core.SearchResponse;
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

    @Override
    public List<Long> searchDogs(String query, String searchField) throws IOException {
        /*
        개 검색 조건
            - name
            - species
            - shelterName
         */
        Query boolQuery = BoolQuery.of(b -> {
            if ("name".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("name").query(query)));
            } else if ("species".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("species").query(query)));
            } else if ("shelterName".equalsIgnoreCase(searchField)) {
                b.should(s -> s.nested(n -> n
                        .path("shelter")
                        .query(q -> q.matchPhrase(m -> m.field("shelter.name").query(query)))));
            }

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
    public List<Long> searchPosts(String query, String searchField) throws IOException {
        /*
        게시글 검색 조건
            - title
            - content
            - dogName
            - shelterName
            - userNickname
         */
        Query boolQuery = BoolQuery.of(b -> {
            if ("title".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("title").query(query)));
            }
            else if ("content".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("content").query(query)));
            }
            else if ("dogName".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("dogName").query(query)));
            }
            else if ("shelterName".equalsIgnoreCase(searchField)) {
                b.should(s -> s.nested(n -> n
                        .path("shelter")
                        .query(q -> q.matchPhrase(m -> m.field("shelter.name").query(query)))));
            }
            else if ("userNickname".equalsIgnoreCase(searchField)) {
                b.should(s -> s.matchPhrase(m -> m.field("userNickname").query(query)));
            }

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