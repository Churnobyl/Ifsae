package com.easteregg.ifsae.global.elasticsearch.index;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@Document(indexName = "dog")
@Mapping(mappingPath = "/index/dog-mappings.json")
@Setting(settingPath = "/index/tokenizer-settings.json")
public class ESDog {
    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String breed;

    @Field(type = FieldType.Keyword)
    private String imgUrl;

    @Field(type = FieldType.Nested)
    private ESShelter shelter;
}