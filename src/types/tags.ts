export type CreateTagPayload = {
  name: string;
}

export type Tag = {
  id: string;
  createdAt: string;
} & CreateTagPayload
