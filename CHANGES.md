v2.0.0
------

+ Exposed the `redis` library as `server.plugins['hapi-hiredis'].library`.
+ [BREAKING CHANGE] Now `redis` and `hiredis` are `peerDependencies` which allows the developer more flexibility.
