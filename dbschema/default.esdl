module default {

    # MultiTenant
    global tenant_id: str {
        default := ('default')
    };

    # CurrentUser
    global current_user_id: uuid;

    global current_user := (
        select User filter .id = global current_user_id
    );

    scalar type Gender extending enum<Unknown, Male, Female>;

    scalar type UserType extending enum<Unset, Employee, Customer, ShopManager>;

    abstract type BaseEntity{
        annotation title :=  'BaseEntity';
        annotation description := 'All entities extending BaseEntity';

        property creation_time -> datetime {
            annotation title := '创建时间';
            default := (std::datetime_current());
        }

        property deletion_time -> datetime {
            annotation title := '删除时间';
            # default := (std::datetime_current());
        }

        property last_modification_time -> datetime {
            annotation title := '最后修改时间';
            # default := (std::datetime_current());
        };

        property is_enabled -> bool {
            annotation title := '是否启用';
            default := (true);
        };

        required tenant_id -> str {
            annotation title := '租户';
            default := ('default')
        }

        required is_deleted -> bool {
            annotation title := '是否已删除';
            default := (false);
        };

        access policy allowAll
            allow all
            using (true);

        access policy denySelect
            deny select
            using (.is_deleted=true);

        # access policy tenant
        #     allow select
        #     using ((global tenant_id = .tenant_id) ?? false);
    }

    type User extending BaseEntity {
        annotation title := '用户表';

        property name -> str {
            annotation title := '姓名';
        };

        property gender -> Gender {
            annotation title := '性别';
            default := (Gender.Unknown);
        };

        property phone -> str {
            annotation title := '电话';
        };

        property user_type -> UserType {
            annotation title := '用户类型';
            default := UserType.Unset
        };

        property erp_user_id -> str {
            annotation title := 'Erp用户ID';
        };

        multi roles := (.<user[is UserRole])
    }

    type UserRole extending BaseEntity {
        annotation title := '用户角色';
        required user: User;
        required role: Role;
    }

    type Role extending BaseEntity {
        annotation title := '角色';

        property name -> str {
            annotation title := '权限名称';
        };

        property code -> str {
            annotation title := '编码';
        };

        property is_static -> bool {
            annotation title := '是否固有';
            default := (false)
        };

        property is_public -> bool {
            annotation title := '是否公开';
            default := (false)
        };

        property is_default -> bool {
            annotation title := '是否默认';
            default := (false)
        };

        property sorting -> int64 {
            annotation title := '编码';
        };

        multi users := (.<role[is UserRole]);

        multi permissions := (.<role[is RolePermission]);
    }

    type RolePermission extending BaseEntity {
        annotation title := '角色权限';
        required permission: Permission;
        required role: Role;
    }

    type Permission extending BaseEntity {
        annotation title := '权限';

        property name -> str {
            annotation title := '权限名称';
        };

        property code -> str {
            annotation title := '编码';
        };

        property sorting -> int64 {
            annotation title := '编码';
        };

        multi roles := (.<permission[is RolePermission]);
    }

    # type Customer extending User {
    #     annotation title := '客户表';

    #     overloaded property user_type -> UserType {
    #         annotation title := '用户类型';
    #         default := UserType.Customer
    #     };

    #     property shopName -> str {
    #         annotation title := '门店名称';
    #     };
    #     property shopCode -> str {
    #         annotation title := '门店编码';
    #     };

    #     multi link activities: ActivityCustomer {
    #         annotation title := '用户参与的活动列表';
    #     };
    # }

    # type ShopManager extending User {
    #     annotation title := '邀请人表';

    #     overloaded property user_type -> UserType {
    #         annotation title := '用户类型';
    #         default := UserType.ShopManager
    #     };

    #     property positionName -> str {
    #         annotation title := '职位名称';
    #     };

    # }

    type Activity extending BaseEntity {
        annotation title :=  '活动';
        annotation description := '活动';

        property coverUrl -> str {
            annotation title := '封面地址';
        };

        property title -> str {
            annotation title := '标题';
        };

        property description -> str {
            annotation title := '活动简介';
        };

        property address -> str {
            annotation title := '活动地址';
        };

        property max_count -> int64 {
            annotation title := '参与人数量';
        };

        property content -> str {
            annotation title := '活动说明';
        };

        property qrcode_rect -> str {
            annotation title := '二维码图片位置';
        };

        property bg_image -> str {
            annotation title := '活动图片';
        };

        property is_image_set -> bool {
            annotation title := '是否设置了图片模板';
            default := (false)
        };

        property start_time -> datetime {
            annotation title := '开始时间';
            default := (std::datetime_current());
        };

        property end_time -> datetime {
            annotation title := '结束时间';
            # default := (std::datetime_current());
        };

        property is_actived -> bool {
            annotation title := '是否活跃';
            default := (true);
        };

        # multi customers: ActivityCustomer {
        #     annotation title := '本次活动的用户列表';
        # };

        multi customers := (.<activity[is ActivityCustomer])

        # multi customers: ActivityCustomer {
        #     # ensures a one-to-many relationship
        #     constraint exclusive;
        # }
    }

    type ActivityCustomer extending BaseEntity {
        annotation title := '用户-活动的映射关系表';

        property customer_name -> str {
            annotation title := '客户名称';
        };

        property customer_gender -> str {
            annotation title := '客户性别';
        };

        property customer_phone -> str {
            annotation title := '客户电话';
        };

        property remarks -> str {
            annotation title := '备注';
        };

        property inviter_name -> str {
            annotation title := '邀请人名称';
        };

        property last_invite_time -> datetime {
            annotation title := '最后邀请时间';
            # default := (std::datetime_current());
        };

        property is_invited -> bool {
            annotation title := '是否邀请';
            default := (false);
        };

        property is_checked -> bool {
            annotation title := '是否审核';
            default := (false);
        };

        property is_signed -> bool {
            annotation title := '是否签到';
            default := (false);
        };

        property is_gifted -> bool {
            annotation title := '是否发放礼品';
            default := (false);
        };

        required link activity : Activity {
            annotation title := '活动';
        };

        link customer : User {
            annotation title := '客户';
        };

        link inviter : User {
            annotation title := '邀请人';
        };
    }

    type SignLog extending BaseEntity {
        annotation title := '签到日志';

        property customer_name -> str {
            annotation title := '客户名称';
        };

        property remarks -> str {
            annotation title := '备注';
        };

        link owner: ActivityCustomer {
            annotation title := '签到者';
        };
    }

    type GiftLog extending BaseEntity {
        annotation title := '礼品发放日志';

        property customer_name -> str {
            annotation title := '客户名称';
        };

        property remarks -> str {
            annotation title := '备注';
        };

        link owner: ActivityCustomer {
            annotation title := '领取者';
        };
    }

    

}
