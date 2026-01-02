import { ERRORS, LABELS } from "@/constants";
import { endOfDay, isBefore, parseJSON, startOfDay } from "date-fns";
import { z } from "zod";

export const createTokenSchema = z
  .object({
    owner: z.string().optional(),
    active_before: z.iso
      .datetime({ message: ERRORS.wrongDateFormat })
      .optional(),
    has_private_access: z.boolean({ message: ERRORS.required }),
    comment: z.string().optional(),
    points: z
      .int()
      .nonnegative({
        message: ERRORS.nonNegativeInteger,
      })
      .optional(),
    has_active_before: z.boolean(),
    has_points: z.boolean(),
  })
  .superRefine((data, ctx) => {
    if (!data.owner && !data.comment) {
      ctx.addIssue({
        code: "custom",
        message: ERRORS.oneOfFieldsRequired(LABELS.owner, LABELS.comment),
        path: ["owner"],
      });
      return;
    }
    if (data.owner && data.owner.length < 3) {
      ctx.addIssue({
        code: "custom",
        message: ERRORS.shortText(3),
        path: ["owner"],
      });
    }
    if (data.comment && data.comment.length < 5) {
      ctx.addIssue({
        code: "custom",
        message: ERRORS.shortText(5),
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
            message: ERRORS.pastDate,
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
