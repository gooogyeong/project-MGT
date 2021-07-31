// TODO: 라이브러리에저 제공되는 타입 없는지?
export type Node = {
  type: string;
  name: string;
  children: Node[];
  next: Node;
  prev: Node;
  parent: Node;
  data: string;
  attribs?: {
    src: string;
    alt: string;
  }
}
