module logs{
    type AuditLog{
        annotation title := '审计日志';

        property app_name -> str {
            annotation title := '应用名称';
        };

        property user_id -> str {
            annotation title := '用户Id';
        };

        property user_name -> str {
            annotation title := '用户Id';
        };

        property client_id -> str {
            annotation title := '客户端ID';
        };

        property client_name -> str {
            annotation title := '客户端名称';
        };

        property ip -> str {
            annotation title := 'IP地址';
        };

        property browser_info -> str {
            annotation title := '浏览器信息';
        };

        property host -> str {
            annotation title := 'HOST';
        };

        property url -> str {
            annotation title := 'URL';
        };

        property http_method -> str {
            annotation title := 'HTTP请求方式';
        };

        property http_status -> int64 {
            annotation title := 'HTTP状态码';
        };

        property handler_name -> str {
            annotation title := '服务名称';
        };

        property headers -> json {
            annotation title := 'Headers';
        };

        # property params -> json {
        #     annotation title := 'Params';
        # };

        # property query -> json {
        #     annotation title := 'Query';
        # };

        # property body -> str {
        #     annotation title := 'Body';
        # };

        property data -> json {
            annotation title := 'Data';
        };

        property error -> json {
            annotation title := 'Error';
        };

        property duration -> int64 {
            annotation title := '执行时长';
        };

        property excution_time -> datetime {
            annotation title := '执行时间';
            default := (std::datetime_current());
        };
    }
}