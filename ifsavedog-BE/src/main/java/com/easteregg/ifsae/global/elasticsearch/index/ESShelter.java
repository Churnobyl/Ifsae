package com.easteregg.ifsae.global.elasticsearch.index;

import org.springframework.data.elasticsearch.annotations.Field;
import org.springframework.data.elasticsearch.annotations.FieldType;

public class ESShelter {

    @Field(type = FieldType.Keyword)
    private String shelterId;

    @Field(type = FieldType.Text)
    private String name;

}
