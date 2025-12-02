import { cn } from '@/lib/util.js';

{
  /*
  사용법

  <Button variant="solid" sizes="lg">Solid</Button>
  <Button variant="outline" sizes="md">Outline</Button>
  <Button variant="tonal" sizes="sm">Tonal</Button>
  <Button variant="ghost" sizes="base">Ghost</Button>
  <Button variant="accent" sizes="icon">Accent</Button>
  */
}

// 사이즈, 색상 등 변경하고 싶은거 classname에 추가
export default function Button({
  variant = 'solid', //기본값
  size = 'lg',
  className,
  children,
  ...props
}) {
  // 1. 공통 스타일
  const baseStyles =
    'inline-flex items-center justify-center rounded-lg font-bold focus:outline-none disabled:opacity-50 disabled:pointer-events-none';

  // 2. 종류별 스타일
  const variants = {
    solid: 'bg-brand-black text-white hover:bg-brand-black/90 ',
    outline: 'bg-white text-gray-900 border border-gray-300 hover:bg-gray-100',
    tonal: 'bg-red-100 text-red-500 hover:bg-red-200',
    ghost: 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900',
    accent: 'bg-yellow-400 text-gray-900 hover:bg-yellow-500',
  };

  // 3. 크기별 스타일
  const sizes = {
    sm: 'w-18 h-8 ',
    base: 'h-10 w-27',
    md: 'w-30 h-10 ',
    lg: 'w-38.5 h-12 ',
    icon: 'h-10 w-10 ',
  };

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      {...props}
    >
      <span className="flex items-center gap-2.5">{children}</span>
    </button>
  );
}
