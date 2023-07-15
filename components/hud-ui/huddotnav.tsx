import React from "react";

export type DotNavItem = {
  label: string; // label name as a string
  id: string; // used to navigate to header
  offsetTop?: number;
  subitems?: DotNavItem[]; // array of subitems, each of type DotNavItem
};

type Props = {
  data: DotNavItem[];
  focusedSection?: string | null;
};

const toRomanNumeral = (num: number): string => {
  const romanNumerals: [string, number][] = [
    ["M", 1000],
    ["CM", 900],
    ["D", 500],
    ["CD", 400],
    ["C", 100],
    ["XC", 90],
    ["L", 50],
    ["XL", 40],
    ["X", 10],
    ["IX", 9],
    ["V", 5],
    ["IV", 4],
    ["I", 1],
  ];
  let result = "";
  romanNumerals.forEach(([letter, value]: [string, number]) => {
    while (num >= value) {
      result += letter;
      num -= value;
    }
  });
  return result;
};

const HudDotNav = ({ data, focusedSection }: Props) => {
  const dotNavItems = data.map((item, index) => {
    const { label, id, subitems } = item;
    const isActiveSection = focusedSection === id;
    const activeStyle = isActiveSection ? "text-OffWhite opacity-90" : "";

    return (
      <>
        <li
          key={id}
          className={`list-none font-[CygnitoMono-002] text-[14px] font-light uppercase text-OffWhite-dark opacity-75 transition-all duration-[250ms] hover:text-[15px] hover:opacity-100  ${activeStyle}`}
        >
          SEC.{toRomanNumeral(index + 1)}.{" "}
          <a
            href={`#${id}`}
            className="text-LunarGrey hover:text-OffWhite-dark"
          >
            {label.replace(/^([IVXLCDM]+)?\.\s+/i, "")}
          </a>
        </li>
        <ul>
          {subitems &&
            subitems.map((subitem, subIndex) => {
              const isActiveSubitem = focusedSection === subitem.id;
              const activeSubitemStyle = isActiveSubitem
                ? "text-OffWhite-dark opacity-90"
                : "";

              return (
                <li
                  key={subitem.id}
                  className={`hover:text-[15px cubic list-none font-[CygnitoMono-002] text-[14px] uppercase text-OffWhite-dark opacity-50 
                  transition-all duration-500 before:text-LunarGrey before:content-['_|_'] hover:opacity-100 ${activeSubitemStyle} font-light hover:text-[15px]`}
                >
                  {toRomanNumeral(index + 1)}.{toRomanNumeral(subIndex + 1)}{" "}
                  <a
                    href={`#${subitem.id}`}
                    className={`${activeSubitemStyle} text-LunarGrey hover:text-OffWhite-dark`}
                  >
                    {subitem.label}
                  </a>
                </li>
              );
            })}
        </ul>
      </>
    );
  });

  return (
    <div className="mx-0 mb-8 mt-4">
      <ul className="p-0">{dotNavItems}</ul>
    </div>
  );
};

export default HudDotNav;
