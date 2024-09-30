package com.easteregg.ifsae.global.elasticsearch.index;

import jakarta.persistence.Id;
import lombok.Builder;
import lombok.Getter;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@Document(indexName = "donation")
@Mapping(mappingPath = "/index/donation-mappings.json")
@Setting(settingPath = "/index/tokenizer-settings.json")
public class ESDonation {

    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Keyword)
    private String shelterId;

    @Field(type = FieldType.Keyword)
    private String userId;

    @Field(type = FieldType.Text)
    private String userNickname;

    @Field(type = FieldType.Keyword)
    private String userProfileImgUrl;

    @Field(type = FieldType.Text)
    private String DogName;

}
