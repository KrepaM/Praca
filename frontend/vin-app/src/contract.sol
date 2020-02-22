pragma solidity ^0.5.0;

contract CarInfo {
    
    uint ovrCarInfoCount;
    Info[] info;
    
    struct Car {
        string VIN;
        string carName;
        string model;
        string yearProduction;
        string weekProduction;
        string bodyType;
        string color;
        string engineType;
        string gearboxType;
        string technicalCondition;
        string mileage;
        string date;
    }
    
    struct Info {
        Car [] car;
        string lastSearch; //date
        uint searchCount;
        string hash;
    }
    
    constructor () public {
        ovrCarInfoCount = 0;
        info = [];
    }
    
    function getInfo(string memory VIN, string memory _lastSearch) view public returns (string [] memory) {
        string [] memory str = [];
        uint i = 0;
        for(i; i < info.length; i++) {
            uint j = 0;
            for(j; j < info[i].car.length; j++) {
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
    
    function insertNewInfo(
        string memory _VIN,
        string memory _carName,
        string memory _model,
        string memory _yearProduction,
        string memory _weekProduction, 
        string memory _bodyType,
        string memory _color,
        string memory _engineType,
        string memory _gearboxType,
        string memory _technicalCondition,
        string memory _mileage,
        string memory _date,
        string memory hash) public {
            uint i = 0;
            for(i; i < info.length; i++){
                if(info[i].car.length > 0 && info[i].car[0].VIN == _VIN){
                    Car memory newCar = Car(_VIN, _carName, _model, _yearProduction, _weekProduction, _bodyType, _color, _engineType, _gearboxType, _technicalCondition, _mileage, _date);
                    info[i].car.push(newCar);
                    ovrCarInfoCount++;
                }
            }
        }
    
    function insertNewInfoWithVerification(
        string memory _carName,
        string memory _model,
        string memory _yearProduction,
        string memory _weekProduction, 
        string memory _bodyType,
        string memory _color,
        string memory _engineType,
        string memory _gearboxType,
        string memory _technicalCondition,
        string memory _mileage,
        string memory _date,
        string memory _hash) public returns (string [] memory) {
            uint i = 0;
            for(i; i < info.length; i++) {
                if(info[i].car.length > 0 && info[i].car[0].VIN == _VIN) {
                    insertNewInfo(_VIN,
                    _carName, 
                    _model, 
                    _yearProduction, 
                    _weekProduction, 
                    _bodyType, 
                    _color, 
                    _engineType, 
                    _gearboxType, 
                    _technicalCondition, 
                    _mileage, 
                    _date,
                    '');
                } else {
                    info[i].car.hash = keccak256(_VIN + 
                    _carName + 
                    _model + 
                    _yearProduction + 
                    _bodyType + 
                    _color + 
                    _engineType + 
                    _gearboxType + 
                    _mileage + 
                    _date);
                    return ["CONFIRM_ADDING_NEW_INFO", info[i].car.hash]; //Niezmienialne dane zostały zmienione
                }
            }
        }
    
    function compareCars(
        string memory _VIN1,
        string memory _carName1,
        string memory _model1,
        string memory _yearProduction1,
        string memory _weekProduction1, 
        string memory _bodyType1,
        string memory _color1,
        string memory _engineType1,
        string memory _gearboxType1,
        string memory _mileage1,
        string memory _date1,
        string memory _VIN2,
        string memory _carName2,
        string memory _model2,
        string memory _yearProduction2,
        string memory _weekProduction2, 
        string memory _bodyType2,
        string memory _color2,
        string memory _engineType2,
        string memory _gearboxType2,
        string memory _mileage2,
        string memory _date2) pure public returns (bool) {
        if(
            _VIN1 == _VIN2 &&
            _carName1 == _carName2 &&
            _model1 == _model2 &&
            _yearProduction1 == _yearProduction2 &&
            _weekProduction1 == _weekProduction2 &&
            _bodyType1 == _bodyType2 &&
            _color1 == _color2 &&
            _engineType1 == _engineType2 &&
            _gearboxType1 == _gearboxType2
            ) {
                return true;
        }
        uint mileage1 = stringToUint(_mileage1);
        uint mileage2 = stringToUint(_mileage2);
        if(mileage1 <= mileage2) {
            return true;
        } else {
            return false;
        }
    }
    
    function stringToUint(string memory s) public pure returns (uint) {
        bytes memory b = bytes(s);
        uint result = 0;
        for (uint i = 0; i < b.length; i++) {
            if (b[i] >= 48 && b[i] <= 57) {
                result = result * 10 + (uint(b[i]) - 48);
            }
        }
        return result;
    }
    
}