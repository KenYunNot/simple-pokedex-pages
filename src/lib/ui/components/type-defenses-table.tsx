import type { TypeWithRelations } from "@/lib/types/type"

import { useState, useEffect, Fragment } from "react";
import clsx from "clsx";

import TypeIcon from "./type-icon"

import { getTypeDefenses } from "@/lib/utils"


export default function TypeDefensesTable({ types } : { types : TypeWithRelations[] }) {
  const [typeList, setTypeList] = useState([] as string[]);
  const typeDefenses = getTypeDefenses(types);

  useEffect(() => {
    fetch('/api/types')
      .then(res => {
        return res.json();
      })
      .then(data => {
        setTypeList(data.typeList);
      })
  }, [])

  return (
    <div className="flex flex-col items-center gap-2">
      <Table typeDefenses={typeDefenses} typeList={typeList.slice(0, typeList.length/2)} />
      <Table typeDefenses={typeDefenses} typeList={typeList.slice(typeList.length/2)} />
    </div>
  )
}

function Table({ 
  typeDefenses,
  typeList
} : { 
  typeDefenses: { [key: string] : number },
  typeList: string[],
}) {

  return (
    <table className="w-fit border-collapse">
      <thead>
        <tr>
          {typeList.map(name => {
            return (
              <th key={name} className="p-0 border">  
                <TypeIcon name={name} shortened={true} link={true} />
              </th>
            );
          })}
        </tr>
      </thead>
      <tbody>
        <tr className="h-7 md:h-10">
          {typeList.map(name => {
            const value = typeDefenses[name];
            const tableCellStyle = clsx(
              "border text-md text-center text-yellow-500",
              {
                "bg-gray-900" : value === 0,
                "bg-red-950" : value === 0.25,
                "bg-red-700" : value === 0.5,
                "bg-green-600" : value === 2,
                "bg-green-900" : value === 4,
              }
            )

            return (
              <td key={name} className={tableCellStyle}>
                <Multiplier value={typeDefenses[name]} />
              </td>
            )
          })}
        </tr>
      </tbody>
    </table>
  )
}

function Multiplier({
  value,
} : {
  value?: number,
}) {
  const valueToElement = {
    0.25: "\u00BC",
    0.5: "\u00BD",
    1: "",
    2: "2",
    4: "4",
  } as { [key: number] : string }

  return (
    <span>
      {value && valueToElement[value]}
    </span>
  )
}