package com.easteregg.ifsae.global.elasticsearch.index;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

@Getter
@Builder
public class ESShelter {

    @Field(type = FieldType.Keyword)
    private String shelterId;

    @Field(type = FieldType.Text)
    private String name;

}
