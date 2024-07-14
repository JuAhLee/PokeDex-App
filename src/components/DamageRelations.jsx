import React, { useEffect } from "react";

const DamageRelations = ({ damages }) => {
  console.log(damages);

  useEffect(() => {
    const arrayDamage = damages.map((damage) =>
      separateObjectBetweenToAndFrom(damage)
    );

    if (arrayDamage.length === 2) {
      //합치는 부분
    } else {
      postDamageValue(arrayDamage[0].from);
    }
  }, []);

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
    console.log("re", result);
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
        console.log(acc);
        return (acc = { [keyWithValueFilterRemove]: value, ...acc });
      }, {});
    return result;
  };

  return <div>DamageRelations</div>;
};

export default DamageRelations;
