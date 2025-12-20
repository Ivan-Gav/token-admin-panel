import { Button } from "@/components/ui/Button";
import { Checkbox } from "@/components/ui/Checkbox";

import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  // FieldSeparator,
  FieldSet,
} from "@/components/ui/Field";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";

export const TokenCreatePage = () => {
  return (
    <div className="w-full h-full grow flex flex-col justify-center items-center">
      <form className="w-full sm:w-3/4 min-w-3/4">
        <FieldGroup>
          <FieldSet>
            <FieldLegend>Создать токен</FieldLegend>
            <FieldDescription>
              Вбивайте буквы в поля пока не получится что-нибудь интересное
            </FieldDescription>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="owner">Владелец</FieldLabel>
                <Input id="owner" placeholder="Мария Кирсанова" required />
              </Field>
              <Field>
                <FieldLabel htmlFor="points">Баланс</FieldLabel>
                <Input id="points" placeholder="1 000 000" required />
                <FieldDescription>Количество пойнтов (points)</FieldDescription>
              </Field>
              <div className="grid grid-cols-3 gap-4">
                <Field>
                  <FieldLabel htmlFor="active-before">
                    Действителен до
                  </FieldLabel>
                  <Input id="active-before" placeholder="123" required />
                </Field>
              </div>
            </FieldGroup>
          </FieldSet>
          {/* <FieldSeparator /> */}
          <FieldSet>
            <FieldGroup>
              <Field orientation="horizontal">
                <Checkbox id="has-private-access" defaultChecked />
                <FieldLabel
                  htmlFor="has-private-access"
                  className="font-normal"
                >
                  Предоставить доступ к приватным раутам
                </FieldLabel>
              </Field>
            </FieldGroup>
          </FieldSet>
          <FieldSet>
            <FieldGroup>
              <Field>
                <FieldLabel htmlFor="comment">Комментарий</FieldLabel>
                <Textarea
                  id="comment"
                  placeholder="Любая дополнительная информация на ваше усмотрение"
                  className="resize-none"
                />
              </Field>
            </FieldGroup>
          </FieldSet>
          <Field orientation="horizontal">
            <Button type="submit">Подтвердить</Button>
            <Button variant="outline" type="button">
              Отмена
            </Button>
          </Field>
        </FieldGroup>
      </form>
    </div>
  );
};

// Данные для создания токена

// active_before | Type:string
// comment | Type:string
// has_private_access | Type:boolean
// owner | Type:string
// points | Type:integer
