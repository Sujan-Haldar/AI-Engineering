plugins {
    java
    id("org.springframework.boot") version "4.1.1" apply false
    id("io.spring.dependency-management") version "1.1.7" apply false
}

group = "org.example"
version = "0.0.1-SNAPSHOT"
description = "GenAi"


allprojects {
    repositories {
        mavenCentral()
    }
}
extra["springAiVersion"] = "2.0.1"

subprojects {

    apply(plugin = "java")

    java {
        toolchain {
            languageVersion.set(JavaLanguageVersion.of(17))
        }
    }
    tasks.withType<Test> {
        useJUnitPlatform()
    }
}