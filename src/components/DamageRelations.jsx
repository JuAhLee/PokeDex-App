import { useEffect, useState } from "react";
import Type from "../components/Type";

const DamageRelations = ({ damages }) => {
  // console.log(damages);

  const [damagePokemonForm, setDamagePokemonForm] = useState();
  // console.log(Object.entries(damagePokemonForm));

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      //데미지 속성이 2개일 때
      const obj = joinDamageRelations(arrayDamage);
      // console.log(obj); // 2개의 속성 데미지 관계를 각 from, to 하나로 합침.

      setDamagePokemonForm(reduceDuplicateValues(postDamageValue(obj.from)));
      //console.log(reduceDuplicateValues(postDamageValue(obj.from))); // 2개 속성 포켓몬 데미지 관계 결과
    } else {
      //데미지 속성이 1개일 때
      setDamagePokemonForm(postDamageValue(arrayDamage[0].from));
    }
  }, []);

  const joinDamageRelations = (props) => {
    return {
      to: joinObjects(props, "to"),
      from: joinObjects(props, "from"),
    };
  };

  const reduceDuplicateValues = (props) => {
    const duplicateValues = {
      double_damage: "4x",
      half_damage: "1/4x",
      no_damage: "0x",
    };

    return Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const verifiedValue = filterForUniqueValues(value, duplicateValues[key]);
      return (acc = { [keyName]: verifiedValue, ...acc });
    }, {});
  };

  const filterForUniqueValues = (valueForFiltering, damageValue) => {
    //console.log(valueForFiltering, damageValue); // 속성별 half, double Damage 목록

    return valueForFiltering.reduce((acc, currentValue) => {
      const { url, name } = currentValue;
      // console.log(url, name); //속성별 url, 속성 name

      const filterACC = acc && acc.filter((a) => a.name !== name); //겹치는 속성 filter

      return filterACC.length === acc.length
        ? (acc = [currentValue, ...acc])
        : (acc = [{ damageValue: damageValue, name, url }, ...filterACC]);
    }, []);
  };

  const joinObjects = (props, string) => {
    const key = string;
    const firstArrayValue = props[0][key];
    const secondArrayValue = props[1][key];
    // console.log("props", props);   // 총 데미지 속성  , arrayDamage
    // console.log("firstArrayValue", firstArrayValue); // 각 to, from 에 관한 데미지 속성

    const result = Object.entries(secondArrayValue).reduce(
      (acc, [keyName, value]) => {
        const result = firstArrayValue[keyName].concat(value);

        return (acc = { [keyName]: result, ...acc });
      },
      {}
    );
    // console.log(result);  // first, second에서 double, half, no damage 병합
    return result;
  };

  // type이 1개인 데미지 관계
  const postDamageValue = (props) => {
    const result = Object.entries(props).reduce((acc, [keyName, value]) => {
      const key = keyName;

      const valuesOfKeyName = {
        double_damage: "2X",
        half_damage: "1/2x",
        no_damage: "0x",
      };

      return (acc = {
        [keyName]: value.map((i) => ({
          // console.log(i)  속성
          // console.log(valuesOfKeyName[key])  데미지 값 (ex. 2x)
          damageValue: valuesOfKeyName[key],
          ...i,
        })),
        ...acc,
      });
    }, {});
    // console.log("re", result);
    return result;
  };

  //   데이터 가공1 (_from, _to 순서로 합치기)
  const separateObjectBetweenToAndFrom = (damage) => {
    const from = filterDamageRelations("_from", damage);

    const to = filterDamageRelations("_to", damage);

    return { from, to };
  };

  const filterDamageRelations = (valueFilter, damage) => {
    const result = Object.entries(damage) // key, value 쌍 반환

      .filter(([keyName, value]) => {
        return keyName.includes(valueFilter);
      })

      .reduce((acc, [keyName, value]) => {
        const keyWithValueFilterRemove = keyName.replace(valueFilter, "");
        // console.log(acc);
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  return (
    <div className="flex gap-2 flex-col">
      {damagePokemonForm ? (
        <>
          {Object.entries(damagePokemonForm).map(([keyName, value]) => {
            const key = keyName;
            const valuesOfKeyName = {
              double_damage: "Weak",
              half_damage: "Resistant",
              no_damage: "Immune",
            };

            return (
              <div key={key}>
                <h3 className="capitalize font-medium text-sm md:text-base text-slate-500 text-center ">
                  {valuesOfKeyName[key]}
                </h3>

                <div className="flex flex-wrap gap-1 justify-center">
                  {value.length > 0 ? (
                    value.map(({ name, url, damageValue }) => {
                      return (
                        <Type type={name} key={url} damageValue={damageValue} />
                      );
                    })
                  ) : (
                    <Type type={"none"} key={"none"} />
                  )}
                </div>
              </div>
            );
          })}
        </>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DamageRelations;
