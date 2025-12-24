import { endOfDay, isBefore, parseJSON, startOfDay } from "date-fns";
import { z } from "zod";

export const createTokenSchema = z
  .object({
    owner: z.string().optional(),
    active_before: z.iso
      .datetime({ message: "Неверный формат даты" })
      .optional(),
    has_private_access: z.boolean({ message: "Обязательное поле" }),
    comment: z.string().optional(),
    points: z
      .int()
      .nonnegative({
        message: "Здесь должно быть положительное целое число",
      })
      .optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.owner && !data.comment) {
      ctx.addIssue({
        code: "custom",
        message:
          "Хотя бы одно из полей 'Владелец' или 'Комментарий' должно быть заполнено",
        path: ["owner"],
      });
      return;
    }
    if (data.owner && data.owner.length < 3) {
      ctx.addIssue({
        code: "custom",
        message: "Имя слишком короткое (мин - 3 символа)",
        path: ["owner"],
      });
    }
    if (data.comment && data.comment.length < 5) {
      ctx.addIssue({
        code: "custom",
        message: "Комментарий слишком короткий (мин - 5 символов)",
        path: ["comment"],
      });
    }

    if (data.active_before) {
      try {
        const date = startOfDay(parseJSON(data.active_before));
        const today = endOfDay(new Date());

        if (isBefore(date, today)) {
          ctx.addIssue({
            code: "custom",
            message: "Дата окончания срока действия должна быть в будущем",
            path: ["active_before"],
          });
        }
      } catch {}
    }
  });

export const isPastDatestring = (datestring: string) => {
  try {
    const date = startOfDay(parseJSON(datestring));
    const today = endOfDay(new Date());

    return isBefore(date, today);
  } catch {
    return false;
  }
};
