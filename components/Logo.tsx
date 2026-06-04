import Image from "next/image";

type LogoProps = {
  priority?: boolean;
  className?: string;
};

export function Logo({ priority = false, className = "" }: LogoProps) {
  return (
    <div className={`inline-block bg-transparent ${className}`}>
      <Image
        src="/logo.png"
        alt="Star Family"
        width={200}
        height={70}
        priority={priority}
        unoptimized
        className="block h-[50px] w-[143px] bg-transparent object-contain md:h-[70px] md:w-[200px]"
        style={{ backgroundColor: "transparent" }}
      />
    </div>
  );
}
