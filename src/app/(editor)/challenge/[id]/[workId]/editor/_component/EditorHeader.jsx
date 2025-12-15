'use client';
import Button from '@/components/Button';
import Image from 'next/image';
import exitImg from '@/assets/icon_exit.svg';
import logoImg from '@/assets/logo-main.svg';
export default function Header({ title, onSave, onSubmit, onCancel }) {
  return (
    <div className="w-full max-w-4xl mt-14 justify-between items-center mb-6 px-4">
      <div className="flex justify-between">
        <Image src={logoImg} alt="logo" height={27} />
        <div className="flex gap-2">
          <Button
            variant="tonal"
            size="md"
            onClick={onCancel}
            className="w-20.25 gap-1.25"
          >
            포기
            <Image
              src={exitImg}
              alt="exit"
              width={20}
              height={20}
              className=" "
            />
          </Button>

          <Button
            variant="outline"
            size="md"
            onClick={onSave}
            className="w-22.5"
          >
            임시저장
          </Button>

          <Button
            variant="solid"
            size="md"
            onClick={onSubmit}
            className="w-22.5"
          >
            제출하기
          </Button>
        </div>
      </div>
      <h1 className="text-xl font-semibold text-gray-800 mt-2">{title}</h1>
    </div>
  );
}
