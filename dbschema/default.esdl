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
    }

    type Customer extending User {
        annotation title := '客户表';

        overloaded property user_type -> UserType {
            annotation title := '用户类型';
            default := UserType.Customer
        };

        property shopName -> str {
            annotation title := '门店名称';
        };
        property shopCode -> str {
            annotation title := '门店编码';
        };

        multi link activities: ActivityCustomer {
            annotation title := '用户参与的活动列表';
        };
    }

    type ShopManager extending User {
        annotation title := '邀请人表';

        overloaded property user_type -> UserType {
            annotation title := '用户类型';
            default := UserType.ShopManager
        };

        property positionName -> str {
            annotation title := '职位名称';
        };

    }

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

        link customer : Customer {
            annotation title := '客户';
        };

        link inviter : ShopManager {
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
