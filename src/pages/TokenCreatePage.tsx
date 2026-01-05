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
  TokenCreateDataForm,
  TokenCreateResponseData,
} from "@/types";
import { createTokenSchema } from "@/utils/validation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api, apiClient, checkIsAuthError } from "@/api";
import { getApiError } from "@/utils/errorHandling";
import { useAuthContext } from "@/context";
import { useNavigate } from "@tanstack/react-router";
import { useModalStore } from "@/store/useModalStore";
import { LABELS } from "@/constants";

export const TokenCreatePage = () => {
  const defaultValues: TokenCreateDataForm = {
    owner: "",
    comment: "",
    active_before: undefined,
    points: 0,
    has_private_access: false,
    has_active_before: false,
    has_points: false,
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

  const onSubmit = async ({ value }: { value: TokenCreateDataForm }) => {
    // fields has_active_before, has_points should not be sent to backend
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { has_active_before, has_points, ...formData } = value;

    const adjustedFormData = has_points
      ? formData
      : { ...formData, points: undefined };

    // show confirmation modal if has_private_access is true
    if (adjustedFormData.has_private_access) {
      const proceed = await new Promise<boolean>((resolve) => {
        onOpen("confirmPrivateAccess", { resolve });
      });

      if (!proceed) {
        return;
      }
    }

    try {
      await mutation.mutateAsync(
        createTokenSchema
          .omit({ has_active_before: true, has_points: true })
          .parse(adjustedFormData)
      );
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
        <FieldLegend>{LABELS.createToken}</FieldLegend>

        <form.Field
          name="owner"
          children={(field) => (
            <Field>
              <FieldLabel htmlFor={field.name}>{LABELS.owner}</FieldLabel>
              <Input
                placeholder={LABELS.fullName}
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
              <FieldLabel htmlFor={field.name}>{LABELS.comment}</FieldLabel>
              <Textarea
                id={field.name}
                name={field.name}
                value={field.state.value}
                onBlur={field.handleBlur}
                onChange={(e) => field.handleChange(e.target.value)}
                placeholder={LABELS.commentPlaceholder}
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

        <FieldSet className="border rounded-md p-4">
          <form.Field
            name="has_points"
            listeners={{
              onChange: ({ value }) => {
                if (!value) {
                  form.setFieldValue("points", 0);
                }
              },
            }}
            children={({ name, state, handleChange, handleBlur }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={name}
                  onCheckedChange={(checked) => handleChange(checked === true)}
                  onBlur={handleBlur}
                  checked={state.value}
                />
                <FieldLabel htmlFor={name}>{LABELS.setPoints}</FieldLabel>
                <FieldError className="whitespace-pre">
                  {state.meta.errors.map((error) => error?.message).join("\n")}
                </FieldError>
              </Field>
            )}
          ></form.Field>

          <form.Subscribe
            selector={(state) => state.values.has_points}
            children={(isChecked) => (
              <form.Field
                name="points"
                children={(field) => (
                  <Field className="max-w-48">
                    <Input
                      placeholder="1 000 000"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onBlur={field.handleBlur}
                      disabled={!isChecked}
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
            )}
          />
        </FieldSet>

        <FieldSet className="border rounded-md p-4">
          <form.Field
            name="has_active_before"
            listeners={{
              onChange: ({ value }) => {
                if (!value) {
                  form.setFieldValue("active_before", undefined);
                }
              },
            }}
            children={({ name, state, handleChange, handleBlur }) => (
              <Field orientation="horizontal">
                <Checkbox
                  id={name}
                  onCheckedChange={(checked) => handleChange(checked === true)}
                  onBlur={handleBlur}
                  checked={state.value}
                />
                <FieldLabel htmlFor={name}>{LABELS.setActiveBefore}</FieldLabel>
                <FieldError className="whitespace-pre">
                  {state.meta.errors.map((error) => error?.message).join("\n")}
                </FieldError>
              </Field>
            )}
          ></form.Field>

          <form.Subscribe
            selector={(state) => state.values.has_active_before}
            children={(isChecked) => (
              <form.Field
                name="active_before"
                children={({ state, handleChange }) => (
                  <Field className="max-w-48">
                    <DatePicker
                      dateString={state.value}
                      setDateString={handleChange}
                      disabled={!isChecked}
                    />
                    <FieldError className="whitespace-pre">
                      {state.meta.errors
                        .map((error) => error?.message)
                        .join("\n")}
                    </FieldError>
                  </Field>
                )}
              />
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
                {LABELS.setHasPrivateAccess}
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
                {LABELS.submit}
              </Button>
            )}
          />
          <Button
            variant="outline"
            type="button"
            onClick={resetForm}
            className="w-32"
          >
            {LABELS.reset}
          </Button>
        </Field>

        <form.Subscribe
          selector={(state) => [state.errorMap.onServer]}
          children={([error]) => <FieldError>{error}</FieldError>}
        />
      </form>
    </div>
  );
};
