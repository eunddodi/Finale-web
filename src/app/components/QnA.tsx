import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

export function QnA() {

  const data = [
    { q: '스케이트 대여 가능한가요?', a: '제니스 하프링크, 하남 아이스박스 수업은 링크장 내 연마실에서 대여 가능합니다. (대여비 발생)\n그 외의 장소는 피날레 자체 대여 시스템 사용 가능하며 1회 7000원으로 대여가능합니다.\n사이즈 별로 구비하고 있으나 수량이 한정적이라 대여 필요시 사전 문의 부탁드립니다.' },
    { q: '수강신청은 언제부터 인가요?', a: '매월 25일부터 월말까지 익월 신규 수강생을 모집합니다.\n한번 수강신청을 하게 되면 피날레 정회원이 되고, 수강신청을 우선적으로 할 수 있게 됩니다.' },
    { q: '초보인 경우에는 초보반 위주라고 적힌 반만 신청 가능한가요?', a: '아니요 :) 모든 수업 신청 가능하십니다!\n초보반 위주라고 적힌 반은 링크장이 작아 초보반 한정으로 모집하는 것일 뿐입니다.' },
    { q: '수강신청 전에 마감되어 있는 반은 무엇인가요?', a: '기존 수강생분들이 휴식신청을 하지 않은 경우에 TO가 나지 않아 마감으로 표기 되어 있는 것 입니다.' },
    { q: '기존 링크장의 단체강습이나 개인강습과 다른가요?', a: '네. 저희는 모든 수업이 저희 피날레 수강생으로만 이루어져있는 대관수업입니다!\n저희가 링크장을 통째로 빌려 사용하는 것이라고 생각하면 됩니다!' },
    { q: '수강료가 왜 반마다 다르게 책정되어있나요?', a: '앞서 말씀드렸듯이 링크장을 대관하여 진행하는 수업이다보니 링크장별로 대관비가 시간과 요일에 따라 달라져 반마다 수강료가 상이합니다.' },
    { q: '보강 가능한가요?', a: '기본적으로 대관수업 특성상 환불 및 이월이 불가능하지만 미리 말씀해주시는 경우 월 1회에 한해서 보강해드리려고 하고 있습니다.\n하지만 당일 결석의 경우 보강 불가합니다.' },
    { q: '수강생이 아닌데 연습대관 참여가 가능한가요?', a: '피날레 수강생이 아니더라도 연습대관 참여 가능합니다. 문의 주세요!' },
  ]

  return (
    <Accordion type="single" collapsible className='w-128'>
      {data.map((item, index) => (
        <AccordionItem key={index} value={`item-${index}`}>
          <AccordionTrigger>{item.q}</AccordionTrigger>
          <AccordionContent className='whitespace-pre-wrap'>{item.a}</AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  )
}
