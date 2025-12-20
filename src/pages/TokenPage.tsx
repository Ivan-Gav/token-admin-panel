import { getRouteApi } from "@tanstack/react-router";

import { Time, Wrapper } from "../components/ui";
import { StatusIcons } from "../components/StatusIcons";

import { CircleCheck } from "lucide-react";

import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

//---------------------------------------------------------
const StatusIcon = ({
  isActive,
  onClick,
}: {
  isActive: boolean;
  onClick: (value: boolean) => void;
}) => {
  const handleClick = onClick(isActive);

  return (
    <button onClick={handleClick}>
      {isActive ? (
        <CircleCheck className="text-green-600 cursor-pointer" />
      ) : (
        <CircleCheck className="text-gray-500 cursor-pointer" />
      )}
    </button>
  );
};

//---------------------------------------------------------

const route = getRouteApi("/tokens/$id");

export const TokenPage = () => {
  const { useLoaderData } = route;

  const data = useLoaderData();

  console.log("token data: ", data);

  const {
    id,
    active_before: activeBefore,
    created_at: createdAt,
    comment,
    has_private_access: hasPrivateAccess,
    is_active: isActive,
    owner,
    points,
  } = data.data;

  const onStatusClick = () => {};

  return (
    <Wrapper>
      {/* <div className="grid grid-cols-12 gap-1 p-4 w-full">
        <>
          <div className="col-span-5">{id}</div>
          <div className="col-span-3 justify-self-end">
            <Time timestring={createdAt} title="создан" />
          </div>
          <div className="col-span-3 justify-self-end">
            {!!activeBefore && (
              <Time timestring={activeBefore} title="истекает" />
            )}
          </div>
          <div className="col-span-1">
            <StatusIcons
              isActive={isActive}
              hasPrivateAccess={!!hasPrivateAccess}
            />
          </div>
        </>
        <>
          <div className="col-span-10">
            {!!owner && <div>{`Владелец: ${owner}`}</div>}
            {!!comment && <div>{`Комментарий: ${comment}`}</div>}
          </div>
          <div className="col-span-2 justify-self-end pr-1">
            <span>{points ?? "—"}</span>
          </div>
        </>
      </div>
       */}

      <Card className="w-max">
        <CardHeader className="w-max">
          <CardTitle>{id}</CardTitle>
          <CardAction>
            {isActive ? (
              <CircleCheck className="text-green-600" />
            ) : (
              <CircleCheck className="text-gray-500" />
            )}
          </CardAction>
        </CardHeader>
        <CardContent>
          <p>Card Content</p>
        </CardContent>
        <CardFooter>
          <p>Card Footer</p>
        </CardFooter>
      </Card>
    </Wrapper>
  );
};
