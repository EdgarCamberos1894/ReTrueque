package com.nocountry.retrueque.model.mapper;

import com.nocountry.retrueque.model.dto.request.RequestReq;
import com.nocountry.retrueque.model.dto.response.CustomPage;
import com.nocountry.retrueque.model.dto.response.RequestCommentsRes;
import com.nocountry.retrueque.model.dto.response.RequestRes;
import com.nocountry.retrueque.model.entity.Request;
import org.mapstruct.BeforeMapping;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.springframework.data.domain.Page;

@Mapper(componentModel = "spring")
public interface RequestMapper extends RequestToRequestRes {
    Request toEntity(RequestReq request);

    @Mapping(source = "userOrigin.name", target = "name")
    @Mapping(source = "userOrigin.last_name", target = "lastname")
    @Mapping(source = "userOrigin.profile.profile_image_url", target = "imgUrl")
    RequestCommentsRes toRequestCommentsRes(Request request);

    @Mapping(target = "currentPage", source = "page.number")
    @Mapping(target = "totalPages", source = "page.totalPages")
    @Mapping(target = "totalElements", source = "page.totalElements")
    @Mapping(target = "isFirst", source = "page.first")
    @Mapping(target = "isLast", source = "page.last")
    @Mapping(target = "pageSize", source = "page.size")
    CustomPage<RequestCommentsRes> toCustomPage(Page<RequestCommentsRes> page);

}

@Mapper(componentModel = "spring")
interface RequestToRequestRes {
    @BeforeMapping
    default void beforeToRequestRes(Request request) {
        if (request.getIsConfirm()) {
            request.getServiceTarget().getUser().getProfile().setPhone(null);
        }
    }

    @Mappings({
            @Mapping(source = "userOrigin.name", target = "user.name"),
            @Mapping(source = "userOrigin.last_name", target = "user.last_name"),
            @Mapping(source = "userOrigin.profile.profile_image_url", target = "user.img_profile"),
            @Mapping(source = "userOrigin.profile.departamento.provincia.name", target = "user.provincia"),
            @Mapping(source = "userOrigin.profile.departamento.name", target = "user.departamento"),
            @Mapping(source = "isConfirm", target = "status"),

            @Mapping(source = "serviceTarget.user.profile.phone", target = "provider.phone"),
            @Mapping(source = "serviceTarget.user.name", target = "provider.name"),
            @Mapping(source = "serviceTarget.user.last_name", target = "provider.last_name"),
            @Mapping(source = "serviceTarget.user.profile.profile_image_url", target = "provider.img_profile"),
            @Mapping(source = "serviceTarget.user.profile.departamento.name", target = "provider.departamento"),
            @Mapping(source = "serviceTarget.user.profile.departamento.provincia.name", target = "provider.provincia")
    })
    RequestRes toRequestRes(Request request);
}
