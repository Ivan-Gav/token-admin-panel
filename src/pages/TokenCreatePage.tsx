import { revalidateLogic, useForm } from "@tanstack/react-form";

import { DatePicker } from "@/components/DatePicker";
import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

import {
  Field,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import type {
  Response,
  TokenCreateData,
  TokenCreateResponseData,
} from "@/types";
import { createTokenSchema } from "@/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiClient, checkIsAuthError } from "@/api";
import { getApiError } from "@/utils/errorHandling";
import { useAuthContext } from "@/context";
import { useNavigate } from "@tanstack/react-router";
import { useModalStore } from "@/store/useModalStore";

export const TokenCreatePage = () => {
  const defaultValues: TokenCreateData = {
    owner: "",
    comment: "",
    active_before: undefined,
    points: 0,
    has_private_access: false,
  };

  const queryClient = useQueryClient();
  const { setApiKey, setIsAuthError } = useAuthContext();
  const navigate = useNavigate();
  const { onOpen } = useModalStore();

  const mutation = useMutation({
    mutationFn: async (value: TokenCreateData) => {
      const response = await apiClient.post<Response<TokenCreateResponseData>>(
        api.createToken,
        value
      );
      return response;
    },
    onSuccess: (response) => {
      queryClient.invalidateQueries({ queryKey: ["tokens"] });
      form.reset();
      const { token: id } = response.data.data;
      onOpen("createSuccess", { id });
    },
    onError: (error) => {
      form.setErrorMap({
        onServer: getApiError(error) as unknown as typeof undefined,
      });
    },
  });

  const onSubmit = async ({ value }: { value: TokenCreateData }) => {
    try {
      await mutation.mutateAsync(createTokenSchema.parse(value));
    } catch (error) {
      console.log("error: ", error);
      console.log("message: ", getApiError(error));
      if (checkIsAuthError(error)) {
        setApiKey("");
        setIsAuthError(true);
        queryClient.clear();
        throw navigate({
          to: "/login",
        });
      }
    }
  };

  const form = useForm({
    defaultValues,
    onSubmit,
    validationLogic: revalidateLogic(),
    validators: {
      onDynamic: createTokenSchema,
    },
  });

  const resetForm = () => {
    form.setErrorMap({ onServer: undefined });
    form.reset();
  };

  return (
    <div className="w-full max-w-154 h-full grow flex flex-col justify-center items-center">
      <form
        className="w-full sm:w-3/4 min-w-3/4 flex flex-col gap-8"
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
      >
        <FieldLegend>Создать токен</FieldLegend>

        <form.Field
          name="owner"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Владелец</FieldLabel>
              <Input
                placeholder="Мария Кирсанова"
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => {
                  let value = e.target.value;
                  value = value
                    .replace(/[^a-zA-Zа-яА-Я.\s]/g, "")
                    .replace(/\s\s+/g, " ")
                    .trimStart();

                  field.handleChange(value);
                }}
              />
              <FieldError className="whitespace-pre">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join("\n")}
              </FieldError>
            </Field>
          )}
        />

        <form.Field
          name="comment"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>Комментарий</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder="Любая дополнительная информация на ваше усмотрение"
                className="resize-none"
              />
              <FieldError className="whitespace-pre">
                {field.state.meta.errors
                  .map((error) => error?.message)
                  .join("\n")}
              </FieldError>
            </Field>
          )}
        />

        <FieldSet className="md:flex-row">
          <form.Field
            name="points"
            children={(field) => (
              <Field>
                <FieldLabel htmlFor={field.name}>Баланс (points)</FieldLabel>
                <Input
                  placeholder="1 000 000"
                  id={field.name}
                  name={field.name}
                  value={field.state.value}
                  onBlur={field.handleBlur}
                  onChange={(e) => {
                    const value = Number(e.target.value.replace(/\D/g, ""));
                    field.handleChange(value);
                  }}
                />
                <FieldError className="whitespace-pre">
                  {field.state.meta.errors
                    .map((error) => error?.message)
                    .join("\n")}
                </FieldError>
              </Field>
            )}
          />

          <form.Field
            name="active_before"
            children={({ name, state, handleChange }) => (
              <Field className="w-fit">
                <FieldLabel htmlFor={name}>Действителен до</FieldLabel>
                <DatePicker
                  dateString={state.value}
                  setDateString={handleChange}
                />
                <FieldError className="whitespace-pre">
                  {state.meta.errors.map((error) => error?.message).join("\n")}
                </FieldError>
              </Field>
            )}
          />
        </FieldSet>

        <form.Field
          name="has_private_access"
          children={({ name, state, handleChange, handleBlur }) => (
            <Field orientation="horizontal">
              <Checkbox
                id={name}
                onCheckedChange={(checked) => handleChange(checked === true)}
                onBlur={handleBlur}
                checked={state.value}
              />
              <FieldLabel htmlFor={name} className="font-normal">
                Предоставить доступ к приватным раутам
              </FieldLabel>
              <FieldError className="whitespace-pre">
                {state.meta.errors.map((error) => error?.message).join("\n")}
              </FieldError>
            </Field>
          )}
        />

        <Field orientation="horizontal" className="justify-center">
          <form.Subscribe
            selector={(state) => [state.canSubmit]}
            children={([canSubmit]) => (
              <Button type="submit" disabled={!canSubmit} className="w-32">
                Подтвердить
              </Button>
            )}
          />
          <Button
            variant="outline"
            type="button"
            onClick={resetForm}
            className="w-32"
          >
            Сбросить
          </Button>
        </Field>

        <form.Subscribe
          selector={(state) => [state.errorMap.onServer]}
          children={([error]) => <FieldError>{error}</FieldError>}
        />
      </form>
      {/* <Button
        onClick={() => {
          onOpen("createSuccess", {
            id: "122111111111111111111111111111111111111111134322222222222222222222222222222",
          });
        }}
        className="mt-14"
      >
        Модалка
      </Button> */}
    </div>
  );
};

// Данные для создания токена

// active_before | Type:string
// comment | Type:string
// has_private_access | Type:boolean
// owner | Type:string
// points | Type:integer
