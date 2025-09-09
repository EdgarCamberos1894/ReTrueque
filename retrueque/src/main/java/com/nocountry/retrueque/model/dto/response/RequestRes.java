package com.nocountry.retrueque.model.dto.response;



import java.time.LocalDate;

public record RequestRes(
        Long id,
        String description,
        LocalDate date,
        Boolean status,
        UserRequest user,
        UserService provider
) {
    public record UserService(
            String name,
            String last_name,
            String img_profile,
            String provincia,
            String departamento,
            String phone
    ){
    }

    public record UserRequest(
            String name,
            String last_name,
            String img_profile,
            String provincia,
            String departamento

    ){
    }



}
