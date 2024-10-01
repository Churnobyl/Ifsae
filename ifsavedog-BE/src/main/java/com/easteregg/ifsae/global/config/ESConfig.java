package com.easteregg.ifsae.global.config;

import co.elastic.clients.elasticsearch.ElasticsearchClient;
import co.elastic.clients.json.jackson.JacksonJsonpMapper;
import co.elastic.clients.transport.ElasticsearchTransport;
import co.elastic.clients.transport.TransportUtils;
import co.elastic.clients.transport.rest_client.RestClientTransport;
import javax.net.ssl.SSLContext;
import org.apache.http.HttpHost;
import org.apache.http.conn.ssl.NoopHostnameVerifier;
import org.apache.http.message.BasicHeader;
import org.elasticsearch.client.RestClient;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ESConfig {

    @Value("${elasticsearch.url}")
    private String host;

    @Value(value = "${elasticsearch.apikey}")
    private String apiKey;

    @Value("${elasticsearch.fingerprint}")
    private String fingerprint;

    @Bean
    public ElasticsearchClient elasticsearchClient() {
        SSLContext sslContext = TransportUtils.sslContextFromCaFingerprint(fingerprint);

        RestClient restClient = RestClient.builder(HttpHost.create(host))
                                          .setDefaultHeaders(new BasicHeader[]{
                                                  new BasicHeader("Authorization", "ApiKey " + apiKey)
                                          })
                                          .setHttpClientConfigCallback(httpClientBuilder ->
                                                                               httpClientBuilder.setSSLContext(sslContext)
                                                                                                .setSSLHostnameVerifier(NoopHostnameVerifier.INSTANCE))
                                          .build();

        // Create the transport with a Jackson mapper
        ElasticsearchTransport transport = new RestClientTransport(
                restClient, new JacksonJsonpMapper());

        // Return the API client
        return new ElasticsearchClient(transport);
    }
}
