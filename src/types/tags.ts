export type CreateTagPayload = {
  name: string;
}

export type Tag = {
  id: string;
  createdAt: number;
} & CreateTagPayload
