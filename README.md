# :soccer: 우먼 풋볼 Server
### 여성 전용 풋살 매칭 서비스입니다.

## Import Rule
```
// 외부 라이브러리
import { Controller, Get } from '@nestjs/common';

// 내부 라이브러리
import { PrismaService } from '@app/prisma'

// 절대경로
import { AppService } from './app.service';
```

## Convention
- Airbnb ESLint 를 사용합니다.
- Branch 를 선형으로 관리하기 위해 ```Squash and merge``` 전략을 사용합니다.
- Package Manager 는 ```yarn``` 을 사용합니다.

## Commit message
[Conventialnal Commits](https://www.conventionalcommits.org/ko/v1.0.0-beta.4/) 을 따릅니다.