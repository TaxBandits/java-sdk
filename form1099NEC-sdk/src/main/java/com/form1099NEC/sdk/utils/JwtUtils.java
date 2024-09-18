package com.form1099NEC.sdk.utils;

import io.jsonwebtoken.Header;
import io.jsonwebtoken.SignatureAlgorithm;
import org.jetbrains.annotations.NotNull;
import org.json.JSONObject;

import javax.crypto.Mac;
import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.util.Base64;

public class JwtUtils {

    /**
     * Generate JWT token using HMAC algorithm
     * Parameters: String payload, String clientSecret
     **/
    public static String getJwtToken(@NotNull String payload, @NotNull String clientSecret) {
        String header = getHmacEncodeHeader();
        String signature = hmacSha256(header + "." + payload, clientSecret);
        return header + "." + payload + "." + signature;
    }

    /**
     * Payload encryption by ClientSecret
     * Parameters: String header, String clientSecret
     **/
    public static String hmacSha256(@NotNull String header, @NotNull String clientSecret) {
        try {
            byte[] hash = clientSecret.getBytes(StandardCharsets.UTF_8);
            Mac sha256Hmac = Mac.getInstance("HmacSHA256");
            SecretKeySpec secretKey = new SecretKeySpec(hash, "HmacSHA256");
            sha256Hmac.init(secretKey);
            byte[] signedBytes = sha256Hmac.doFinal(header.getBytes(StandardCharsets.UTF_8));
            return encode(signedBytes);
        } catch (Exception ex) {
            ex.printStackTrace();
            return null;
        }
    }

    /**
     * Load the header by Type and Algorithm
     **/
    public static String getHmacEncodeHeader() {
        try {
            JSONObject header = new JSONObject();
            header.put("typ", Header.JWT_TYPE);
            header.put("alg", SignatureAlgorithm.HS256);
            return encode(header.toString().getBytes(StandardCharsets.UTF_8));
        } catch (Exception ex) {
            ex.printStackTrace();
        }
        return "";
    }

    // Encodes the signature using the specified algorithm
    public static String encode(@NotNull byte[] bytes) {
        return Base64.getUrlEncoder().withoutPadding().encodeToString(bytes);
    }

}
