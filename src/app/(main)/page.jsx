import Image from 'next/image';
import Link from 'next/link';

import Lg from '@/assets/lg.png';
import Md from '@/assets/md.png';
import Sm from '@/assets/sm.png';
import MainLogo from '@/assets/logo-main.svg';
import Button from '@/components/Button';
import Trophy from '@/assets/trophy.png';
import Heart from '@/assets/heart.png';
import Comment from '@/assets/comment.svg';
import Landing1 from '@/assets/landing1_lg.png';
import Landing2 from '@/assets/landing2_lg.png';
import Landing3 from '@/assets/landing3_lg.png';
import Landing1Sm from '@/assets/landing1_sm.png';
import Landing2Sm from '@/assets/landing2_sm.png';
import Landing3Sm from '@/assets/landing3_sm.png';

export default function LandingPage() {
  return (
    <>
      <div className="relative w-full h-125 flex flex-col items-center justify-center">
        <Image
          src={Lg}
          alt="Docthru Banner"
          fill
          className="hidden lg:block object-cover -z-10"
          priority
        />
        <Image
          src={Md}
          alt="Docthru Banner"
          fill
          className="hidden md:block lg:hidden object-cover -z-10"
          priority
        />
        <Image
          src={Sm}
          alt="Docthru Banner"
          fill
          className="block md:hidden object-cover -z-10"
          priority
        />

        <Image src={MainLogo} alt="Docthru" width={126} height={28} priority />
        <p className="mt-4 text-white/90 text-lg text-center drop-shadow-md">
          함께 번역하며 성장하는
          <br />
          개발자의 새로운 영어 습관
        </p>
        <Link
          href="/challenge"
          passHref
          className="mt-6 font-semibold text-color-gray-800"
        >
          <Button variant="outline">번역 시작하기</Button>
        </Link>
      </div>

      <div className="w-full max-w-6xl mx-auto px-6 py-20 flex flex-col gap-24">
        <div className="flex flex-col lg:flex-row px-15 justify-between gap-10">
          <div className="flex flex-col items-start text-left gap-4 lg:max-w-[50%]">
            <Image src={Trophy} alt="Trophy" width={32} height={32} />
            <p className="text-2xl font-bold leading-tight">
              혼자서는 막막했던 번역, <br /> 챌린지로 함께 완성하기
            </p>
            <p className="text-gray-600 text-lg">
              중요한 건 꺾이지 않는 마음! 동료들과 함께 <br />
              기술 문서를 번역해 보세요.
            </p>
          </div>
          <div className="w-full flex justify-center lg:w-1/2">
            <Image
              src={Landing1}
              alt="Landing 1"
              width={570}
              height={411}
              quality={100}
              sizes="100vw"
              className="hidden md:block w-full h-auto object-contain"
            />
            <Image
              src={Landing1Sm}
              alt="Landing 1 Small"
              width={343}
              height={276}
              className="block md:hidden w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-15 justify-between gap-10">
          <div className="flex flex-col items-start text-left gap-4 lg:max-w-[50%]">
            <Image src={Heart} alt="Heart" width={32} height={32} />
            <p className="text-2xl font-bold leading-tight">
              내가 좋아하는 기술 번역,
              <br />
              내가 필요한 기술 번역
            </p>
            <p className="text-gray-600 text-lg">
              이미 진행 중인 번역 챌린지에 참여하거나, <br />
              새로운 번역 챌린지를 시작해 보세요.
            </p>
          </div>
          <div className="w-full flex justify-center  lg:w-1/2">
            <Image
              src={Landing2}
              alt="Landing 2"
              width={570}
              height={455}
              className="hidden md:block w-full h-auto object-contain"
              quality={100}
              sizes="100vw"
            />
            <Image
              src={Landing2Sm}
              alt="Landing 2 Small"
              width={375}
              height={300}
              className="block  md:hidden w-full h-auto object-contain"
            />
          </div>
        </div>

        <div className="flex flex-col lg:flex-row px-15 justify-between gap-10">
          <div className="flex flex-col gap-4 items-start text-left lg:max-w-[50%]">
            <Image src={Comment} alt="Comment" width={32} height={32} />
            <p className="text-2xl  font-bold leading-tight">
              피드백으로 함께 성장하기
            </p>
            <p className="text-gray-600 text-lg">
              번역 작업물에 대해 피드백을 주고 받으며 <br />
              영어 실력은 물론, 개발 실력까지 키워 보세요
            </p>
          </div>
          <div className="w-full flex justify-center lg:w-1/2">
            <Image
              src={Landing3}
              alt="Landing 3"
              width={505}
              height={345}
              quality={100}
              sizes="100vw"
              className="hidden md:block w-full h-auto object-contain"
            />
            <Image
              src={Landing3Sm}
              alt="Landing 3 Small"
              width={243}
              height={234}
              className="block md:hidden w-full h-auto object-contain"
            />
          </div>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center mb-24 px-4 text-center">
        <p className="font-semibold text-xl">함께 번역하고 성장하세요!</p>
        <Link
          href="/challenge"
          passHref
          className="mt-8 font-semibold text-color-gray-800"
        >
          <Button variant="solid">번역 시작하기</Button>
        </Link>
      </div>
    </>
  );
}
