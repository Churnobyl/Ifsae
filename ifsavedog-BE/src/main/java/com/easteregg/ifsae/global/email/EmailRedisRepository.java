package com.easteregg.ifsae.global.email;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmailRedisRepository extends CrudRepository<EmailAuthCode, String> {

}
