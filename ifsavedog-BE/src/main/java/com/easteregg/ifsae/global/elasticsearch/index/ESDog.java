package com.easteregg.ifsae.global.elasticsearch.index;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.Id;
import org.springframework.data.elasticsearch.annotations.Document;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;
import org.springframework.data.elasticsearch.annotations.Mapping;
import org.springframework.data.elasticsearch.annotations.Setting;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Document(indexName = "dog")
@Mapping(mappingPath = "/index/dog-mappings.json")
@Setting(settingPath = "/index/tokenizer-settings.json")
@JsonIgnoreProperties(ignoreUnknown = true)
public class ESDog {
    @Id
    @Field(type = FieldType.Keyword)
    private String id;

    @Field(type = FieldType.Text)
    private String name;

    @Field(type = FieldType.Text)
    private String species;

    @Field(type = FieldType.Nested)
    private ESShelter shelter;
}