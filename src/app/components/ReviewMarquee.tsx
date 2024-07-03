import Marquee from "@/components/magicui/marquee";
import { cn } from "@/lib/utils";

const data = [
  "자세도 꼼꼼하게 봐주시고 너무 친절하게 알려주셔서 좋아요! 어렵지만 새로운 것도 많이 배워서 피겨가 더 재미있어졌고 매주 일요일만 기다리게돼요!",
  "아직 초보인데도 웜업이나 엣지사용을 매번 다른 패턴으로 가르쳐주셔서 스케이팅 자체를 즐길 수 있게 해주시는 것 같아요!!",
  "개별 능력치와 진도에 맞게 진행되는 수업, 친절한 선생님들, 월 1회 보강가능한 수업, 다양한 링크장과 시간 선택지가 장점인 것 같아요",
  "선생님들 동작 하나하나 시범 보여주시고 시도할 수 있게 격려해주셔서 더 재밌게 탈 수 있어요",
  "자세도 꼼꼼하게 봐주시고 너무 친절하게 알려주셔서 좋아요! 어렵지만 새로운 것도 많이 배워서 피겨가 더 재미있어졌고 매주 일요일만 기다리게돼요!",
  "선생님들도 다 너무 친구같이 살갑게 대해주시고 꼼꼼하게 티칭해주셔서 모르겠는 부분이 있을 때 망설임 없이 질문드리고 바로 피드백 받을 수 있는 것도 좋아요",
  "수강생들 한명한명 애정을 가지고 코칭해주는 코치님들 정말 감사합니다 계속 함께하고싶어요..♡",
  "개인별로 다르게 진도를 맞춰주셔서 진도가 느리지않아 재밌어요 ><",
  "제가 아직 초보여서 잘 못타는데 쌤이 알려주실때 손잡고 같이 타면서 꼼꼼히 알려주셔서 좋았어요!",
  "개인 진도로 강습을 나가니까 조금 못하더라도 부담이 없고 제 속도대로 천천히 배울 수 있어서 좋았어요! 그만큼 선생님들이 꼼꼼하게 봐주시고 틈틈이 피드백 주시는 점도 좋아요",
  "개인의 능력치에 따라 개인 위주로 진도를 나가고 새로운 동작들 마구마구 알려주시는 덕분에 지루할 틈 없이 수업받고 있어용 ㅠㅠ♡",
  "다양하게 배울 수 있어서 좋습니다. 스텝도 연결해서 해볼 수 있어서 단순히 한가지만 연습하는 것보다 더 재미있고 신나요 가끔 진행하는 안무수업도 너무 새롭고 재미있어요",
  "예전에는 링크장의 손바닥만한 공간에서 수업하고 다른 사람들이랑 부딪힐까 조마조마하면서 탔는데 피날레는 대관수업으로 진행되어서 그럴 걱정 없이 스스로의 스케이팅에만 집중할 수 있어 좋아요!", "수강생들의 진도와 수업내용을 상세히 기억해주셔서 매주 발전된 내용을 배울 수 있었습니다 :)"
]


const firstRow = data.slice(0, data.length / 2);
const secondRow = data.slice(data.length / 2);

export default function ReviewMarquee() {
  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-lg border bg-background py-20 md:shadow-xl ">
      <Marquee pauseOnHover className="[--duration:20s]">
        {firstRow.map((review, index) => (
          <ReviewCard key={index} body={review} />
        ))}
      </Marquee>
      <Marquee reverse pauseOnHover className="[--duration:20s]">
        {secondRow.map((review, index) => (
          <ReviewCard key={index} body={review} />
        ))}
      </Marquee>
      <div className="pointer-events-none absolute inset-y-0 left-0 w-1/3 bg-gradient-to-r from-white dark:from-background"></div>
      <div className="pointer-events-none absolute inset-y-0 right-0 w-1/3 bg-gradient-to-l from-white dark:from-background"></div>
    </div>
  );
}

const ReviewCard = ({
  body,
}: {
  body: string;
}) => {
  return (
    <figure
      className={cn(
        "relative w-64 cursor-pointer overflow-hidden rounded-xl border p-4",
        // light styles
        "border-gray-950/[.1] bg-gray-950/[.01] hover:bg-gray-950/[.05]",
        // dark styles
        "dark:border-gray-50/[.1] dark:bg-gray-50/[.10] dark:hover:bg-gray-50/[.15]",
      )}
    >
      <blockquote className="mt-2 text-sm">{body}</blockquote>
    </figure>
  );
};