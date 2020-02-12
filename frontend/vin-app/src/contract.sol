pragma solidity ^0.4.2;

contract CarInfo {

    uint  ovrCarInfoCount;
    Info [] info;

    struct Car {
        bytes32 VIN;
        bytes32 carName;
        bytes32 model;
        bytes32 yearProduction;
        bytes32 weekProduction;
        bytes32 bodyType;
        bytes32 color;
        bytes32 engineType;
        bytes32 gearboxType;
        bytes32 technicalCondition;
        bytes32 mileage;
        bytes32 date;
    }

    struct Info {
        Car [] car;
        bytes32 lastSearch; //date
        uint searchCount;
    }

    constructor () public {
        ovrCarInfoCount = 0;
    }

    function getInfo(string VIN, bytes32 _lastSearch) view public returns() {
        bytes32 [] str;
        for(i; i < info.length; i++){
            if(info[i].car.length > 0 && info[i].car[0].VIN == _VIN){
                uint j = 0;
                for(j; j < info[i].car.length; j++){
                    str.push(info[i].car[j].VIN);
                    str.push(info[i].car[j].carName);
                    str.push(info[i].car[j].model);
                    str.push(info[i].car[j].yearProduction);
                    str.push(info[i].car[j].weekProduction);
                    str.push(info[i].car[j].bodyType);
                    str.push(info[i].car[j].color);
                    str.push(info[i].car[j].engineType);
                    str.push(info[i].car[j].gearboxType);
                    str.push(info[i].car[j].technicalCondition);
                    str.push(info[i].car[j].mileage);
                    str.push(info[i].car[j].date);
                }
                info[i].lastSearch = _lastSearch;
                info[i].searchCount++;
                return str;
            }
        }
    };

    function insertNewInfo(bytes32 _VIN,
                        bytes32 _carName,
                        bytes32 _model,
                        bytes32 _yearProduction,
                        bytes32 _weekProduction, 
                        bytes32 _bodyType,
                        bytes32 _color,
                        bytes32 _engineType,
                        bytes32 _gearboxType,
                        bytes32 _technicalCondition,
                        bytes32 _mileage,
                        bytes32 _date
    ) pure public {
        uint i = 0;
        for(i; i < info.length; i++){
            if(info[i].car.length > 0 && info[i].car[0].VIN == _VIN){
                Car newCar = Car(_VIN, _carName, _model, _yearProduction, _weekProduction, _bodyType, _color, _engineType, _gearboxType, _technicalCondition, _mileage, _date);
                info[i].car.push(newCar);
                ovrCarInfoCount++;
            }
        }
    }

}

/*
    View functions ensure that they will not modify the state.
    Pure functions ensure that they not read or modify the state.
    Fallback function is a special function available to a contract. - coś w stylu funktora
*/

/*
    Architektura:
        OPCJA I: Jeden duży kontrakt, funkcja która zwraca tylko samochody o szukanym numerze VIN !!!! WYGRYWA !!!! 28.01
        OPCJA II: Jeden kontrakt na każde auto, w jednym contrakcie trzymane są wszystkie instacje o aucie
*/