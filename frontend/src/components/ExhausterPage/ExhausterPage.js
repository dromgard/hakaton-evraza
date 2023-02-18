import React, { useContext, useEffect, useState } from "react";
import Exhauster from '../../images/Exhauster.svg'
import gateValve from '../../images/gateValve.svg'
import { DataContext } from "../contexts/DataContext";
import ExhausterPanel from "../ExhausterPanel/ExhausterPanel";

function ExhausterPage({ dataDate, updateDataDelay }) {

  //const currentExhausterId = JSON.parse(localStorage.getItem('exhausterId')); // Получаем id нужного эксгаустера.
  //const currentDataTest = useContext(DataContext); // Получаем массив данных из контекста.

  // Получаем нужный эксгаустер.
  // const exhausterData = currentDataTest.map((item) => item.exhausters).flat().filter((item) => item.id === currentExhausterId)[0];

  const data = useContext(DataContext).Message;

  // Переменные
  // {1}
  let exhauster_name = ""
  let bearing1_HeatingTem_temperature
  let bearing1_HeatingTem_alarm_max
  let bearing1_HeatingTem_alarm_min
  let bearing1_HeatingTem_warning_max
  let bearing1_HeatingTem_warning_min

  let bearing1_vibration_axial
  let bearing1_vibration_axial_alarm_max
  let bearing1_vibration_axial_alarm_min
  let bearing1_vibration_axial_warning_max
  let bearing1_vibration_axial_warning_min

  let bearing1_vibration_horizontal
  let bearing1_vibration_horizontal_alarm_max
  let bearing1_vibration_horizontal_alarm_min
  let bearing1_vibration_horizontal_warning_max
  let bearing1_vibration_horizontal_warning_min

  let bearing1_vibration_vertical
  let bearing1_vibration_vertical_alarm_max
  let bearing1_vibration_vertical_alarm_min
  let bearing1_vibration_vertical_warning_max
  let bearing1_vibration_vertical_warning_min

  // {2}
  let bearing2_HeatingTem_temperature
  let bearing2_HeatingTem_alarm_max
  let bearing2_HeatingTem_alarm_min
  let bearing2_HeatingTem_warning_max
  let bearing2_HeatingTem_warning_min

  let bearing2_vibration_axial
  let bearing2_vibration_axial_alarm_max
  let bearing2_vibration_axial_alarm_min
  let bearing2_vibration_axial_warning_max
  let bearing2_vibration_axial_warning_min

  let bearing2_vibration_horizontal
  let bearing2_vibration_horizontal_alarm_max
  let bearing2_vibration_horizontal_alarm_min
  let bearing2_vibration_horizontal_warning_max
  let bearing2_vibration_horizontal_warning_min

  let bearing2_vibration_vertical
  let bearing2_vibration_vertical_alarm_max
  let bearing2_vibration_vertical_alarm_min
  let bearing2_vibration_vertical_warning_max
  let bearing2_vibration_vertical_warning_min

  // {3}
  let bearing3_HeatingTem_temperature
  let bearing3_HeatingTem_alarm_max
  let bearing3_HeatingTem_alarm_min
  let bearing3_HeatingTem_warning_max
  let bearing3_HeatingTem_warning_min

  // {4}
  let bearing4_HeatingTem_temperature
  let bearing4_HeatingTem_alarm_max
  let bearing4_HeatingTem_alarm_min
  let bearing4_HeatingTem_warning_max
  let bearing4_HeatingTem_warning_min

  // {5}
  let bearing5_HeatingTem_temperature
  let bearing5_HeatingTem_alarm_max
  let bearing5_HeatingTem_alarm_min
  let bearing5_HeatingTem_warning_max
  let bearing5_HeatingTem_warning_min

  // {6}
  let bearing6_HeatingTem_temperature
  let bearing6_HeatingTem_alarm_max
  let bearing6_HeatingTem_alarm_min
  let bearing6_HeatingTem_warning_max
  let bearing6_HeatingTem_warning_min

  // {7}
  let bearing7_HeatingTem_temperature
  let bearing7_HeatingTem_alarm_max
  let bearing7_HeatingTem_alarm_min
  let bearing7_HeatingTem_warning_max
  let bearing7_HeatingTem_warning_min

  let bearing7_vibration_axial
  let bearing7_vibration_axial_alarm_max
  let bearing7_vibration_axial_alarm_min
  let bearing7_vibration_axial_warning_max
  let bearing7_vibration_axial_warning_min

  let bearing7_vibration_horizontal
  let bearing7_vibration_horizontal_alarm_max
  let bearing7_vibration_horizontal_alarm_min
  let bearing7_vibration_horizontal_warning_max
  let bearing7_vibration_horizontal_warning_min

  let bearing7_vibration_vertical
  let bearing7_vibration_vertical_alarm_max
  let bearing7_vibration_vertical_alarm_min
  let bearing7_vibration_vertical_warning_max
  let bearing7_vibration_vertical_warning_min

  // {8}
  let bearing8_HeatingTem_temperature
  let bearing8_HeatingTem_alarm_max
  let bearing8_HeatingTem_alarm_min
  let bearing8_HeatingTem_warning_max
  let bearing8_HeatingTem_warning_min

  let bearing8_vibration_axial
  let bearing8_vibration_axial_alarm_max
  let bearing8_vibration_axial_alarm_min
  let bearing8_vibration_axial_warning_max
  let bearing8_vibration_axial_warning_min

  let bearing8_vibration_horizontal
  let bearing8_vibration_horizontal_alarm_max
  let bearing8_vibration_horizontal_alarm_min
  let bearing8_vibration_horizontal_warning_max
  let bearing8_vibration_horizontal_warning_min

  let bearing8_vibration_vertical
  let bearing8_vibration_vertical_alarm_max
  let bearing8_vibration_vertical_alarm_min
  let bearing8_vibration_vertical_warning_max
  let bearing8_vibration_vertical_warning_min

  // {9}
  let bearing9_HeatingTem_temperature
  let bearing9_HeatingTem_alarm_max
  let bearing9_HeatingTem_alarm_min
  let bearing9_HeatingTem_warning_max
  let bearing9_HeatingTem_warning_min

  // Охладитель
  let cooler_oil_temperature_after
  let cooler_oil_temperature_before
  let cooler_water_temperature_after
  let cooler_water_temperature_before

  // Газовый коллектор
  let gas_manifold_temperature_before
  let gas_manifold_underpressure_before

  // Положение задвижки
  let gas_valve_closed
  let gas_valve_open
  let gas_valve_position

  // Главный привод
  let main_drive_rotor_current
  let main_drive_rotor_voltage
  let main_drive_stator_current
  let main_drive_stator_voltage

  // Маслосистема
  let oil_system_oil_level
  let oil_system_oil_pressure

  // Работа эксгаустера
  let exhauster_work



  // Обрабатываем уставки {числа}. == 0 - красный | == 1 - желтый | == 2 - серый.
  function checkValue(value, maxalarm, minalarm, maxwarn, minwarn) {
    if (value > minalarm && value >= maxalarm) return 0
    if (value > minwarn && value >= maxwarn) return 1
    return 2
  }


  /// Отображение box {чисел}
  function ColorBoxCount(temp, vibr_axial = null, vibr_horizontal = null, vibr_vertical = null) {

    let critical = 0
    let warning = 0


    if (temp >= 65 && temp < 75) { warning = warning + 1 }
    if (temp >= 75) { critical = critical + 1 }

    if (vibr_axial >= 4.5 && vibr_axial < 7.1) { warning = warning + 1 }
    if (vibr_axial >= 7.1) { critical = critical + 1 }

    if (vibr_horizontal >= 4.5 && vibr_horizontal < 7.1) { warning = warning + 1 }
    if (vibr_horizontal >= 7.1) { critical = critical + 1 }

    if (vibr_vertical >= 4.5 && vibr_vertical < 7.1) { warning = warning + 1 }
    if (vibr_vertical >= 7.1) { critical = critical + 1 }


    if (critical > 0) return 'box-color_critical'
    if (warning > 0) return 'box-color_warning'

    return 'box-color_normal'
  }


  ////// Графики и их доп.переменные  //////

  function getColorCooler(data) {
    return data >= 30 ? "tile-color_warning" : ''
  }

  // limit - max_width
  let maxGasTemp = 160
  let maxOilLevl = 216
  let maxOilPressure = 214

  // factor
  let factorGasTemp = 1.25
  let factorOilLevl = 2.16
  let factorOilPressure = 35.6

  // Лимит, чтобы график не увеличивался до бесконечности
  function setGasTemp(data, factor, limit) {
    return data * factor >= limit ? limit : data * factor
  }

  /// Для gasTemp | (0-130) до 130 градусов
  // от 0-50 - серый | от 50-70 - желтый | от 70 - красный
  function colorGraph_GasTemp(data) {
    if (data < 50) { return 'graph-color_normal' }
    return data < 70 ? 'graph-color_warning' : 'graph-color_critical'
  }


  /// Для OilLevl | (0-100) до 100 %
  // от 0-20 - красный | от 20-50 - желтый | от 50- серый
  function colorGraph_OilLevl(data) {
    if (data <= 10) { return 'graph-color_critical' }
    return data <= 20 ? 'graph-color_warning' : 'graph-color_normal'
  }

  /// Для OilPressure
  // X < 0,5(0,2) - красный
  function colorGraph_OilPressure(data, exhausterId) {
    if (exhausterId == 1 || 2) return data <= 0.5 ? 'graph-color_critical' : ''
    else return data <= 0.2 ? 'graph-color_critical' : ''
  }

  /// Положение заглушки ///
  /// 105px = 0 - Закрыта | 20px = 100  - Открыта
  function getPositionGateValve(position) {
    return 105 - position.gas_valve_position * 1.05
  }

  function getMainRotorCurrent(current, exhausterId) {
    if (exhausterId === 1 || exhausterId === 2) { return (current >= 250) ? '#d5ac52' : '' }
    else return (current >= 200) ? '#d5ac52' : ''
  }

  function getMainStatorCurrent(current) {
    if (current >= 280) { return '#ef5733' }
    return current >= 230 && current < 280 ? '#d5ac52' : ''
  }

  switch (localStorage.exhausterId) {
    case '1':
      exhauster_name = "У-171"
      // ПС 1
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[2:27]"];
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[2:65]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[2:74]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[2:83]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[2:92]"]

      bearing1_vibration_axial = data["SM_Exgauster\\[2:2]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[2:139]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[2:151]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[2:163]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[2:175]"]

      bearing1_vibration_horizontal = data["SM_Exgauster\\[2:0]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:137]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:149]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:161]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:173]"]

      bearing1_vibration_vertical = data["SM_Exgauster\\[2:1]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:138]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:150]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[2:162]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[2:174]"]

      // ПС 2
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[2:28]"]
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[2:66]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[2:75]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[2:84]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[2:93]"]

      bearing2_vibration_axial = data["SM_Exgauster\\[2:5]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[2:142]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[2:154]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[2:166]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[2:178]"]

      bearing2_vibration_horizontal = data["SM_Exgauster\\[2:3]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:140]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:152]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:164]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:176]"]

      bearing2_vibration_vertical = data["SM_Exgauster\\[2:4]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:141]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:153]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[2:165]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[2:177]"]

      // ПС 3
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[2:29]"]
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[2:67]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[2:76]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[2:85]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[2:94]"]

      // ПС 4
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[2:30]"]
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[2:68]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[2:77]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[2:86]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[2:95]"]

      // ПС 5
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[2:31]"]
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[2:69]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[2:78]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[2:87]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[2:96]"]

      // ПС 6
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[2:32]"]
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[2:70]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[2:79]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[2:88]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[2:97]"]

      // ПС 7
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[2:33]"]
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[2:71]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[2:80]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[2:89]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[2:98]"]

      bearing7_vibration_axial = data["SM_Exgauster\\[2:8]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[2:145]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[2:157]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[2:169]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[2:181]"]

      bearing7_vibration_horizontal = data["SM_Exgauster\\[2:6]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:143]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:155]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:167]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:179]"]

      bearing7_vibration_vertical = data["SM_Exgauster\\[2:7]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:144]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:156]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[2:168]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[2:180]"]

      // ПС 8
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[2:34]"]
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[2:72]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[2:81]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[2:90]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[2:99]"]

      bearing8_vibration_axial = data["SM_Exgauster\\[2:11]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[2:148]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[2:160]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[2:172]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[2:184]"]

      bearing8_vibration_horizontal = data["SM_Exgauster\\[2:9]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:146]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:158]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:170]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:182]"]

      bearing8_vibration_vertical = data["SM_Exgauster\\[2:10]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:147]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:159]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[2:171]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[2:183]"]

      // ПС 9
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[2:35]"]
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[2:73]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[2:82]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[2:91]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[2:100]"]

      //Охладитель
      cooler_oil_temperature_after = data["SM_Exgauster\\[2:42]"]
      cooler_oil_temperature_before = data["SM_Exgauster\\[2:41]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[2:37]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[2:36]"]

      // Газовый коллектор
      gas_manifold_temperature_before = data["SM_Exgauster\\[2:24]"]
      gas_manifold_underpressure_before = data["SM_Exgauster\\[2:61]"]

      // Положение задвижки
      gas_valve_closed = data["SM_Exgauster\\[4.1]"]
      gas_valve_open = data["SM_Exgauster\\[4.2]"]
      gas_valve_position = data["SM_Exgauster\\[4:6]"]

      // Главный привод
      main_drive_rotor_current = data["SM_Exgauster\\[4:2]"]
      main_drive_rotor_voltage = data["SM_Exgauster\\[4:4]"]
      main_drive_stator_current = data["SM_Exgauster\\[4:3]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[4:5]"]

      // Маслосистема
      oil_system_oil_level = data["SM_Exgauster\\[4:0]"]
      oil_system_oil_pressure = data["SM_Exgauster\\[4:1]"]

      // Работа эксгаустера
      exhauster_work = data["SM_Exgauster\\[2:0]"]
      break;
    case '2':
      exhauster_name = "У-172"
      // ПС 1
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[2:43]"]
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[2:101]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[2:110]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[2:119]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[2:128]"]

      bearing1_vibration_axial = data["SM_Exgauster\\[2:14]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[2:187]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[2:199]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[2:211]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[2:223]"]

      bearing1_vibration_horizontal = data["SM_Exgauster\\[2:12]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:185]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:197]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:209]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:221]"]

      bearing1_vibration_vertical = data["SM_Exgauster\\[2:13]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:186]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:198]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[2:210]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[2:222]"]

      // ПС 2
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[2:44]"]
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[2:102]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[2:111]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[2:120]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[2:129]"]

      bearing2_vibration_axial = data["SM_Exgauster\\[2:17]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[2:190]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[2:202]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[2:214]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[2:226]"]

      bearing2_vibration_horizontal = data["SM_Exgauster\\[2:15]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:188]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:200]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:212]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:224]"]

      bearing2_vibration_vertical = data["SM_Exgauster\\[2:16]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:189]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:201]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[2:213]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[2:225]"]

      // ПС 3
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[2:45]"]
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[2:103]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[2:112]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[2:121]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[2:130]"]

      // ПС 4
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[2:47]"]
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[2:104]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[2:113]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[2:122]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[2:131]"]

      // ПС 5
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[2:48]"]
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[2:105]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[2:114]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[2:123]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[2:132]"]

      // ПС 6
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[2:49]"]
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[2:106]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[2:115]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[2:124]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[2:133]"]

      // ПС 7
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[2:50]"]
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[2:107]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[2:116]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[2:125]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[2:134]"]
      bearing7_vibration_axial = data["SM_Exgauster\\[2:20]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[2:193]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[2:205]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[2:217]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[2:229]"]
      bearing7_vibration_horizontal = data["SM_Exgauster\\[2:18]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:191]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:203]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:215]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:227]"]
      bearing7_vibration_vertical = data["SM_Exgauster\\[2:19]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:192]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:204]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[2:216]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[2:228]"]

      // ПС 8
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[2:51]"]
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[2:108]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[2:117]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[2:126]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[2:135]"]
      bearing8_vibration_axial = data["SM_Exgauster\\[2:23]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[2:196]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[2:208]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[2:220]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[2:232]"]
      bearing8_vibration_horizontal = data["SM_Exgauster\\[2:21]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[2:194]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[2:206]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[2:218]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[2:230]"]
      bearing8_vibration_vertical = data["SM_Exgauster\\[2:22]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[2:195]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[2:207]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[2:219]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[2:231]"]

      // ПС 9
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[2:52]"]
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[2:109]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[2:118]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[2:127]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[2:136]"]
      //Охладитель
      cooler_oil_temperature_after = data["SM_Exgauster\\[2:60]"]
      cooler_oil_temperature_before = data["SM_Exgauster\\[2:59]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[2:54]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[2:53]"]

      // Газовый коллектор
      gas_manifold_temperature_before = data["SM_Exgauster\\[2:25]"]
      gas_manifold_underpressure_before = data["SM_Exgauster\\[2:62]"]

      // Положение задвижки
      gas_valve_closed = data["SM_Exgauster\\[4.6]"]
      gas_valve_open = data["SM_Exgauster\\[4.7]"]
      gas_valve_position = data["SM_Exgauster\\[4:13]"]

      // Главный привод
      main_drive_rotor_current = data["SM_Exgauster\\[4:9]"]
      main_drive_rotor_voltage = data["SM_Exgauster\\[4:11]"]
      main_drive_stator_current = data["SM_Exgauster\\[4:10]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[4:12]"]

      // Маслосистема
      oil_system_oil_level = data["SM_Exgauster\\[4:7]"]
      oil_system_oil_pressure = data["SM_Exgauster\\[4:8]"]

      // Работа эксгаустера
      exhauster_work = data["SM_Exgauster\\[2:1]"]
      break;
    case '3':
      exhauster_name = "Ф-171"
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[0:27]"] // ПС 1
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[0:63]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[0:72]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[0:81]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[0:90]"]
      bearing1_vibration_axial = data["SM_Exgauster\\[0:2]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[0:137]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[0:149]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[0:161]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[0:173]"]
      bearing1_vibration_horizontal = data["SM_Exgauster\\[0:0]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:135]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:147]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:159]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:171]"]
      bearing1_vibration_vertical = data["SM_Exgauster\\[0:1]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:136]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:148]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[0:160]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[0:172]"]
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[0:28]"] // ПС 2
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[0:64]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[0:73]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[0:82]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[0:91]"]
      bearing2_vibration_axial = data["SM_Exgauster\\[0:5]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[0:140]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[0:152]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[0:164]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[0:176]"]
      bearing2_vibration_horizontal = data["SM_Exgauster\\[0:3]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:138]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:150]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:162]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:174]"]
      bearing2_vibration_vertical = data["SM_Exgauster\\[0:4]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:139]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:151]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[0:163]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[0:175]"]
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[0:29]"] // ПС 3
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[0:65]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[0:74]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[0:83]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[0:92]"]
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[0:30]"]  // ПС 4
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[0:66]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[0:75]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[0:84]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[0:93]"]
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[0:31]"] // ПС 5
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[0:67]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[0:76]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[0:85]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[0:94]"]
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[0:32]"]  // ПС 6
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[0:68]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[0:77]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[0:86]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[0:95]"]
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[0:33]"] // ПС 7
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[0:69]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[0:78]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[0:87]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[0:96]"]
      bearing7_vibration_axial = data["SM_Exgauster\\[0:8]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[0:143]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[0:155]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[0:167]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[0:179]"]
      bearing7_vibration_horizontal = data["SM_Exgauster\\[0:6]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:141]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:153]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:165]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:177]"]
      bearing7_vibration_vertical = data["SM_Exgauster\\[0:7]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:142]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:154]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[0:166]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[0:178]"]
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[0:34]"] // ПС 8
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[0:70]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[0:79]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[0:88]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[0:97]"]
      bearing8_vibration_axial = data["SM_Exgauster\\[0:11]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[0:146]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[0:158]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[0:170]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[0:182]"]
      bearing8_vibration_horizontal = data["SM_Exgauster\\[0:9]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:144]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:156]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:168]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:180]"]
      bearing8_vibration_vertical = data["SM_Exgauster\\[0:10]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:145]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:157]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[0:169]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[0:181]"]
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[0:35]"] // ПС 9
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[0:71]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[0:80]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[0:89]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[0:98]"]
      cooler_oil_temperature_after = data["SM_Exgauster\\[0:42]"] //Охладитель
      cooler_oil_temperature_before = data["SM_Exgauster\\[0:41]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[0:37]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[0:36]"]
      gas_manifold_temperature_before = data["SM_Exgauster\\[0:24]"] // Газовый коллектор
      gas_manifold_underpressure_before = data["SM_Exgauster\\[0:61]"]
      gas_valve_closed = data["SM_Exgauster\\[1.1]"] // Положение задвижки
      gas_valve_open = data["SM_Exgauster\\[1.2]"]
      gas_valve_position = data["SM_Exgauster\\[1:6]"]
      main_drive_rotor_current = data["SM_Exgauster\\[1:2]"]  // Главный привод
      main_drive_rotor_voltage = data["SM_Exgauster\\[1:4]"]
      main_drive_stator_current = data["SM_Exgauster\\[1:3]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[1:5]"]
      oil_system_oil_level = data["SM_Exgauster\\[1:0]"] // Маслосистема
      oil_system_oil_pressure = data["SM_Exgauster\\[1:1]"]
      exhauster_work = data["SM_Exgauster\\[0.0]"]// Работа эксгаустера
      break;
    case '4':
      exhauster_name = "Ф-172"
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[0:43]"] // ПС 1
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[0:99]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[0:108]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[0:117]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[0:126]"]
      bearing1_vibration_axial = data["SM_Exgauster\\[0:14]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[0:185]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[0:197]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[0:209]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[0:221]"]
      bearing1_vibration_horizontal = data["SM_Exgauster\\[0:12]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:183]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:195]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:207]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:219]"]
      bearing1_vibration_vertical = data["SM_Exgauster\\[0:13]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:184]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:196]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[0:208]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[0:220]"]
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[0:44]"] // ПС 2
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[0:100]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[0:109]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[0:118]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[0:127]"]
      bearing2_vibration_axial = data["SM_Exgauster\\[0:17]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[0:188]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[0:200]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[0:212]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[0:224]"]
      bearing2_vibration_horizontal = data["SM_Exgauster\\[0:15]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:186]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:198]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:210]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:222]"]
      bearing2_vibration_vertical = data["SM_Exgauster\\[0:16]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:187]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:199]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[0:211]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[0:223]"]
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[0:45]"] // ПС 3
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[0:101]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[0:110]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[0:119]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[0:128]"]
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[0:47]"]  // ПС 4
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[0:102]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[0:111]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[0:120]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[0:129]"]
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[0:48]"] // ПС 5
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[0:103]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[0:112]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[0:121]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[0:130]"]
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[0:49]"]  // ПС 6
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[0:104]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[0:113]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[0:122]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[0:131]"]
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[0:50]"] // ПС 7
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[0:105]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[0:114]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[0:123]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[0:132]"]
      bearing7_vibration_axial = data["SM_Exgauster\\[0:20]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[0:191]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[0:203]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[0:215]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[0:227]"]
      bearing7_vibration_horizontal = data["SM_Exgauster\\[0:18]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:189]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:201]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:213]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:225]"]
      bearing7_vibration_vertical = data["SM_Exgauster\\[0:19]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:190]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:202]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[0:214]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[0:226]"]
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[0:51]"] // ПС 8
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[0:106]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[0:115]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[0:124]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[0:133]"]
      bearing8_vibration_axial = data["SM_Exgauster\\[0:23]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[0:194]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[0:206]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[0:218]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[0:230]"]
      bearing8_vibration_horizontal = data["SM_Exgauster\\[0:21]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[0:192]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[0:204]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[0:216]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[0:228]"]
      bearing8_vibration_vertical = data["SM_Exgauster\\[0:22]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[0:193]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[0:205]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[0:217]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[0:229]"]
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[0:52]"] // ПС 9
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[0:107]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[0:116]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[0:125]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[0:134]"]
      cooler_oil_temperature_after = data["SM_Exgauster\\[0:60]"] //Охладитель
      cooler_oil_temperature_before = data["SM_Exgauster\\[0:59]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[0:54]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[0:53]"]
      gas_manifold_temperature_before = data["SM_Exgauster\\[0:25]"] // Газовый коллектор
      gas_manifold_underpressure_before = data["SM_Exgauster\\[0:62]"]
      gas_valve_closed = data["SM_Exgauster\\[1.6]"] // Положение задвижки
      gas_valve_open = data["SM_Exgauster\\[1.7]"]
      gas_valve_position = data["SM_Exgauster\\[1:13]"]
      main_drive_rotor_current = data["SM_Exgauster\\[1:9]"]  // Главный привод
      main_drive_rotor_voltage = data["SM_Exgauster\\[1:11]"]
      main_drive_stator_current = data["SM_Exgauster\\[1:10]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[1:12]"]
      oil_system_oil_level = data["SM_Exgauster\\[1:7]"] // Маслосистема
      oil_system_oil_pressure = data["SM_Exgauster\\[1:8]"]
      exhauster_work = data["SM_Exgauster\\[0.1]"]// Работа эксгаустера
      break;
    case '5':
      exhauster_name = "X-171"
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[3:27]"] // ПС 1
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[3:63]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[3:72]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[3:81]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[3:90]"]
      bearing1_vibration_axial = data["SM_Exgauster\\[3:2]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[3:137]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[3:149]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[3:161]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[3:173]"]
      bearing1_vibration_horizontal = data["SM_Exgauster\\[3:0]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:135]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:147]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:159]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:171]"]
      bearing1_vibration_vertical = data["SM_Exgauster\\[3:1]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:136]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:148]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[3:160]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[3:172]"]
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[3:28]"] // ПС 2
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[3:64]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[3:73]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[3:82]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[3:91]"]
      bearing2_vibration_axial = data["SM_Exgauster\\[3:5]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[3:140]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[3:152]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[3:164]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[3:176]"]
      bearing2_vibration_horizontal = data["SM_Exgauster\\[3:3]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:138]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:150]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:162]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:174]"]
      bearing2_vibration_vertical = data["SM_Exgauster\\[3:4]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:139]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:151]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[3:163]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[3:175]"]
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[3:29]"] // ПС 3
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[3:65]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[3:74]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[3:83]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[3:92]"]
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[3:30]"]  // ПС 4
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[3:66]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[3:75]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[3:84]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[3:93]"]
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[3:31]"] // ПС 5
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[3:67]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[3:76]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[3:85]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[3:94]"]
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[3:32]"]  // ПС 6
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[3:68]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[3:77]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[3:86]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[3:95]"]
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[3:33]"] // ПС 7
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[3:69]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[3:78]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[3:87]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[3:96]"]
      bearing7_vibration_axial = data["SM_Exgauster\\[3:8]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[3:143]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[3:155]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[3:167]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[3:179]"]
      bearing7_vibration_horizontal = data["SM_Exgauster\\[3:6]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:141]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:153]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:165]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:177]"]
      bearing7_vibration_vertical = data["SM_Exgauster\\[3:7]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:142]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:154]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[3:166]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[3:178]"]
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[3:34]"] // ПС 8
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[3:70]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[3:79]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[3:88]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[3:97]"]
      bearing8_vibration_axial = data["SM_Exgauster\\[3:11]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[3:146]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[3:158]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[3:170]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[3:182]"]
      bearing8_vibration_horizontal = data["SM_Exgauster\\[3:9]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:144]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:156]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:168]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:180]"]
      bearing8_vibration_vertical = data["SM_Exgauster\\[3:10]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:145]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:157]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[3:169]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[3:181]"]
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[3:35]"] // ПС 9
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[3:71]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[3:80]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[3:89]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[3:98]"]
      cooler_oil_temperature_after = data["SM_Exgauster\\[3:42]"] //Охладитель
      cooler_oil_temperature_before = data["SM_Exgauster\\[3:41]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[3:37]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[3:36]"]
      gas_manifold_temperature_before = data["SM_Exgauster\\[3:24]"] // Газовый коллектор
      gas_manifold_underpressure_before = data["SM_Exgauster\\[3:61]"]
      gas_valve_closed = data["SM_Exgauster\\[5.1]"] // Положение задвижки
      gas_valve_open = data["SM_Exgauster\\[5.2]"]
      gas_valve_position = data["SM_Exgauster\\[5:6]"]
      main_drive_rotor_current = data["SM_Exgauster\\[5:2]"]  // Главный привод
      main_drive_rotor_voltage = data["SM_Exgauster\\[5:4]"]
      main_drive_stator_current = data["SM_Exgauster\\[5:3]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[5:5]"]
      oil_system_oil_level = data["SM_Exgauster\\[5:0]"] // Маслосистема
      oil_system_oil_pressure = data["SM_Exgauster\\[5:1]"]
      exhauster_work = data["SM_Exgauster\\[3.0]"]// Работа эксгаустера
      break;
    case '6':
      exhauster_name = "X-172"
      bearing1_HeatingTem_temperature = data["SM_Exgauster\\[3:43]"] // ПС 1
      bearing1_HeatingTem_alarm_max = data["SM_Exgauster\\[3:99]"]
      bearing1_HeatingTem_alarm_min = data["SM_Exgauster\\[3:108]"]
      bearing1_HeatingTem_warning_max = data["SM_Exgauster\\[3:117]"]
      bearing1_HeatingTem_warning_min = data["SM_Exgauster\\[3:126]"]
      bearing1_vibration_axial = data["SM_Exgauster\\[3:14]"]
      bearing1_vibration_axial_alarm_max = data["SM_Exgauster\\[3:185]"]
      bearing1_vibration_axial_alarm_min = data["SM_Exgauster\\[3:197]"]
      bearing1_vibration_axial_warning_max = data["SM_Exgauster\\[3:209]"]
      bearing1_vibration_axial_warning_min = data["SM_Exgauster\\[3:221]"]
      bearing1_vibration_horizontal = data["SM_Exgauster\\[3:12]"]
      bearing1_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:183]"]
      bearing1_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:195]"]
      bearing1_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:207]"]
      bearing1_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:219]"]
      bearing1_vibration_vertical = data["SM_Exgauster\\[3:13]"]
      bearing1_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:184]"]
      bearing1_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:196]"]
      bearing1_vibration_vertical_warning_max = data["SM_Exgauster\\[3:208]"]
      bearing1_vibration_vertical_warning_min = data["SM_Exgauster\\[3:220]"]
      bearing2_HeatingTem_temperature = data["SM_Exgauster\\[3:44]"] // ПС 2
      bearing2_HeatingTem_alarm_max = data["SM_Exgauster\\[3:100]"]
      bearing2_HeatingTem_alarm_min = data["SM_Exgauster\\[3:109]"]
      bearing2_HeatingTem_warning_max = data["SM_Exgauster\\[3:118]"]
      bearing2_HeatingTem_warning_min = data["SM_Exgauster\\[3:127]"]
      bearing2_vibration_axial = data["SM_Exgauster\\[3:17]"]
      bearing2_vibration_axial_alarm_max = data["SM_Exgauster\\[3:188]"]
      bearing2_vibration_axial_alarm_min = data["SM_Exgauster\\[3:200]"]
      bearing2_vibration_axial_warning_max = data["SM_Exgauster\\[3:212]"]
      bearing2_vibration_axial_warning_min = data["SM_Exgauster\\[3:224]"]
      bearing2_vibration_horizontal = data["SM_Exgauster\\[3:15]"]
      bearing2_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:186]"]
      bearing2_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:198]"]
      bearing2_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:210]"]
      bearing2_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:222]"]
      bearing2_vibration_vertical = data["SM_Exgauster\\[3:16]"]
      bearing2_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:187]"]
      bearing2_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:199]"]
      bearing2_vibration_vertical_warning_max = data["SM_Exgauster\\[3:211]"]
      bearing2_vibration_vertical_warning_min = data["SM_Exgauster\\[3:223]"]
      bearing3_HeatingTem_temperature = data["SM_Exgauster\\[3:45]"] // ПС 3
      bearing3_HeatingTem_alarm_max = data["SM_Exgauster\\[3:101]"]
      bearing3_HeatingTem_alarm_min = data["SM_Exgauster\\[3:110]"]
      bearing3_HeatingTem_warning_max = data["SM_Exgauster\\[3:119]"]
      bearing3_HeatingTem_warning_min = data["SM_Exgauster\\[3:128]"]
      bearing4_HeatingTem_temperature = data["SM_Exgauster\\[3:47]"]  // ПС 4
      bearing4_HeatingTem_alarm_max = data["SM_Exgauster\\[3:102]"]
      bearing4_HeatingTem_alarm_min = data["SM_Exgauster\\[3:111]"]
      bearing4_HeatingTem_warning_max = data["SM_Exgauster\\[3:120]"]
      bearing4_HeatingTem_warning_min = data["SM_Exgauster\\[3:129]"]
      bearing5_HeatingTem_temperature = data["SM_Exgauster\\[3:48]"] // ПС 5
      bearing5_HeatingTem_alarm_max = data["SM_Exgauster\\[3:103]"]
      bearing5_HeatingTem_alarm_min = data["SM_Exgauster\\[3:112]"]
      bearing5_HeatingTem_warning_max = data["SM_Exgauster\\[3:121]"]
      bearing5_HeatingTem_warning_min = data["SM_Exgauster\\[3:130]"]
      bearing6_HeatingTem_temperature = data["SM_Exgauster\\[3:49]"]  // ПС 6
      bearing6_HeatingTem_alarm_max = data["SM_Exgauster\\[3:104]"]
      bearing6_HeatingTem_alarm_min = data["SM_Exgauster\\[3:113]"]
      bearing6_HeatingTem_warning_max = data["SM_Exgauster\\[3:122]"]
      bearing6_HeatingTem_warning_min = data["SM_Exgauster\\[3:131]"]
      bearing7_HeatingTem_temperature = data["SM_Exgauster\\[3:50]"] // ПС 7
      bearing7_HeatingTem_alarm_max = data["SM_Exgauster\\[3:105]"]
      bearing7_HeatingTem_alarm_min = data["SM_Exgauster\\[3:114]"]
      bearing7_HeatingTem_warning_max = data["SM_Exgauster\\[3:123]"]
      bearing7_HeatingTem_warning_min = data["SM_Exgauster\\[3:132]"]
      bearing7_vibration_axial = data["SM_Exgauster\\[3:20]"]
      bearing7_vibration_axial_alarm_max = data["SM_Exgauster\\[3:191]"]
      bearing7_vibration_axial_alarm_min = data["SM_Exgauster\\[3:203]"]
      bearing7_vibration_axial_warning_max = data["SM_Exgauster\\[3:215]"]
      bearing7_vibration_axial_warning_min = data["SM_Exgauster\\[3:227]"]
      bearing7_vibration_horizontal = data["SM_Exgauster\\[3:18]"]
      bearing7_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:189]"]
      bearing7_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:201]"]
      bearing7_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:213]"]
      bearing7_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:225]"]
      bearing7_vibration_vertical = data["SM_Exgauster\\[3:19]"]
      bearing7_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:190]"]
      bearing7_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:202]"]
      bearing7_vibration_vertical_warning_max = data["SM_Exgauster\\[3:214]"]
      bearing7_vibration_vertical_warning_min = data["SM_Exgauster\\[3:226]"]
      bearing8_HeatingTem_temperature = data["SM_Exgauster\\[3:51]"] // ПС 8
      bearing8_HeatingTem_alarm_max = data["SM_Exgauster\\[3:106]"]
      bearing8_HeatingTem_alarm_min = data["SM_Exgauster\\[3:115]"]
      bearing8_HeatingTem_warning_max = data["SM_Exgauster\\[3:124]"]
      bearing8_HeatingTem_warning_min = data["SM_Exgauster\\[3:133]"]
      bearing8_vibration_axial = data["SM_Exgauster\\[3:23]"]
      bearing8_vibration_axial_alarm_max = data["SM_Exgauster\\[3:194]"]
      bearing8_vibration_axial_alarm_min = data["SM_Exgauster\\[3:206]"]
      bearing8_vibration_axial_warning_max = data["SM_Exgauster\\[3:218]"]
      bearing8_vibration_axial_warning_min = data["SM_Exgauster\\[3:230]"]
      bearing8_vibration_horizontal = data["SM_Exgauster\\[3:21]"]
      bearing8_vibration_horizontal_alarm_max = data["SM_Exgauster\\[3:192]"]
      bearing8_vibration_horizontal_alarm_min = data["SM_Exgauster\\[3:204]"]
      bearing8_vibration_horizontal_warning_max = data["SM_Exgauster\\[3:216]"]
      bearing8_vibration_horizontal_warning_min = data["SM_Exgauster\\[3:228]"]
      bearing8_vibration_vertical = data["SM_Exgauster\\[3:22]"]
      bearing8_vibration_vertical_alarm_max = data["SM_Exgauster\\[3:193]"]
      bearing8_vibration_vertical_alarm_min = data["SM_Exgauster\\[3:205]"]
      bearing8_vibration_vertical_warning_max = data["SM_Exgauster\\[3:217]"]
      bearing8_vibration_vertical_warning_min = data["SM_Exgauster\\[3:229]"]
      bearing9_HeatingTem_temperature = data["SM_Exgauster\\[3:52]"] // ПС 9
      bearing9_HeatingTem_alarm_max = data["SM_Exgauster\\[3:107]"]
      bearing9_HeatingTem_alarm_min = data["SM_Exgauster\\[3:116]"]
      bearing9_HeatingTem_warning_max = data["SM_Exgauster\\[3:125]"]
      bearing9_HeatingTem_warning_min = data["SM_Exgauster\\[3:134]"]
      cooler_oil_temperature_after = data["SM_Exgauster\\[3:60]"] //Охладитель
      cooler_oil_temperature_before = data["SM_Exgauster\\[3:59]"]
      cooler_water_temperature_after = data["SM_Exgauster\\[3:54]"]
      cooler_water_temperature_before = data["SM_Exgauster\\[3:53]"]
      gas_manifold_temperature_before = data["SM_Exgauster\\[3:25]"] // Газовый коллектор
      gas_manifold_underpressure_before = data["SM_Exgauster\\[3:62]"]
      gas_valve_closed = data["SM_Exgauster\\[5.6]"] // Положение задвижки
      gas_valve_open = data["SM_Exgauster\\[5.7]"]
      gas_valve_position = data["SM_Exgauster\\[5:13]"]
      main_drive_rotor_current = data["SM_Exgauster\\[5:9]"]  // Главный привод
      main_drive_rotor_voltage = data["SM_Exgauster\\[5:11]"]
      main_drive_stator_current = data["SM_Exgauster\\[5:10]"]
      main_drive_stator_voltage = data["SM_Exgauster\\[5:12]"]
      oil_system_oil_level = data["SM_Exgauster\\[5:7]"] // Маслосистема
      oil_system_oil_pressure = data["SM_Exgauster\\[5:8]"]
      exhauster_work = data["SM_Exgauster\\[3.1]"]// Работа эксгаустера
      break;
  }

  return (

    <div>
      <ExhausterPanel />

      <main className="main">
        <div className="main__header">
          <div className="main__header-info">
            <div className="main__header-logo"></div>
            <h1 className="section-title">Окно эксгаустера: {exhauster_name}</h1>
          </div>
          <p className="main__header-text">Данные от: {dataDate} | Задержка получения данных: {updateDataDelay}</p>
        </div>
        <ul className="main__info">
          <li className="main__info-item">
            <div className="indicator-yellow"></div>
            <p className="info-text">Предупреждение</p>
          </li>
          <li className="main__info-item">
            <div className="indicator-red"></div>
            <p className="info-text">Опасность</p>
          </li>
        </ul>
      </main>

      <div className="exhauster-story">
        <div className="exhauster-story__sensor">
          <img src={Exhauster} alt='Exhauster' />

          {/* Позиции датчиков*/}
          {/* Циферные датчики */}
          {/* 9 */}
          <div className="exhauster-story__sensor-N9">
            <div className="exhauster-story__sensor-N9-head">9 ПС</div>
            <div className="exhauster-story__sensor-N9-body">
              <div className={`exhauster-story__sensor-N9-body-date ${checkValue(bearing9_HeatingTem_temperature, bearing9_HeatingTem_alarm_max, bearing9_HeatingTem_alarm_min, bearing9_HeatingTem_warning_max, bearing9_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing9_HeatingTem_temperature, bearing9_HeatingTem_alarm_max, bearing9_HeatingTem_alarm_min, bearing9_HeatingTem_warning_max, bearing9_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing9_HeatingTem_temperature.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N9-box ${ColorBoxCount(bearing9_HeatingTem_temperature)}`}>9</div>

          {/* 8 */}
          <div className="exhauster-story__sensor-N8">
            <div className="exhauster-story__sensor-N8-head">8 ПС</div>
            <div className="exhauster-story__sensor-N8-body">
              <div className={`exhauster-story__sensor-N8-body-date ${checkValue(bearing8_HeatingTem_temperature, bearing8_HeatingTem_alarm_max, bearing8_HeatingTem_alarm_min, bearing8_HeatingTem_warning_max, bearing8_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing8_HeatingTem_temperature, bearing8_HeatingTem_alarm_max, bearing8_HeatingTem_alarm_min, bearing8_HeatingTem_warning_max, bearing8_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing8_HeatingTem_temperature.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N8-body-date ${checkValue(bearing8_vibration_axial, bearing8_vibration_axial_alarm_max, bearing8_vibration_axial_alarm_min, bearing8_vibration_axial_warning_max, bearing8_vibration_axial_warning_min) === 2 ? '' : checkValue(bearing8_vibration_axial, bearing8_vibration_axial_alarm_max, bearing8_vibration_axial_alarm_min, bearing8_vibration_axial_warning_max, bearing8_vibration_axial_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>В, мм/c</p>
                <p>{bearing8_vibration_axial.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N8-body-date ${checkValue(bearing8_vibration_horizontal, bearing8_vibration_horizontal_alarm_max, bearing8_vibration_horizontal_alarm_min, bearing8_vibration_horizontal_warning_max, bearing8_vibration_horizontal_warning_min) === 2 ? '' : checkValue(bearing8_vibration_horizontal, bearing8_vibration_horizontal_alarm_max, bearing8_vibration_horizontal_alarm_min, bearing8_vibration_horizontal_warning_max, bearing8_vibration_horizontal_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>Г, мм/c</p>
                <p>{bearing8_vibration_horizontal.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N8-body-date ${checkValue(bearing8_vibration_vertical, bearing8_vibration_vertical_alarm_max, bearing8_vibration_vertical_alarm_min, bearing8_vibration_vertical_warning_max, bearing8_vibration_vertical_warning_min) === 2 ? '' : checkValue(bearing8_vibration_vertical, bearing8_vibration_vertical_alarm_max, bearing8_vibration_vertical_alarm_min, bearing8_vibration_vertical_warning_max, bearing8_vibration_vertical_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>O, мм/c</p>
                <p>{bearing8_vibration_vertical.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N8-box ${ColorBoxCount(bearing8_HeatingTem_temperature, bearing8_vibration_axial, bearing8_vibration_horizontal, bearing8_vibration_vertical)}`}>8</div>

          {/* 7 */}
          <div className="exhauster-story__sensor-N7">
            <div className="exhauster-story__sensor-N7-head">7 ПС</div>
            <div className="exhauster-story__sensor-N7-body">
              <div className={`exhauster-story__sensor-N7-body-date ${checkValue(bearing7_HeatingTem_temperature, bearing7_HeatingTem_alarm_max, bearing7_HeatingTem_alarm_min, bearing7_HeatingTem_warning_max, bearing7_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing7_HeatingTem_temperature, bearing7_HeatingTem_alarm_max, bearing7_HeatingTem_alarm_min, bearing7_HeatingTem_warning_max, bearing7_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing7_HeatingTem_temperature.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N7-body-date ${checkValue(bearing7_vibration_axial, bearing7_vibration_axial_alarm_max, bearing7_vibration_axial_alarm_min, bearing7_vibration_axial_warning_max, bearing7_vibration_axial_warning_min) === 2 ? '' : checkValue(bearing7_vibration_axial, bearing7_vibration_axial_alarm_max, bearing7_vibration_axial_alarm_min, bearing7_vibration_axial_warning_max, bearing7_vibration_axial_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>В, мм/c</p>
                <p>{bearing7_vibration_axial.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N7-body-date ${checkValue(bearing7_vibration_horizontal, bearing7_vibration_horizontal_alarm_max, bearing7_vibration_horizontal_alarm_min, bearing7_vibration_horizontal_warning_max, bearing7_vibration_horizontal_warning_min) === 2 ? '' : checkValue(bearing7_vibration_horizontal, bearing7_vibration_horizontal_alarm_max, bearing7_vibration_horizontal_alarm_min, bearing7_vibration_horizontal_warning_max, bearing7_vibration_horizontal_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>Г, мм/c</p>
                <p>{bearing7_vibration_horizontal.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N7-body-date ${checkValue(bearing7_vibration_vertical, bearing7_vibration_vertical_alarm_max, bearing7_vibration_vertical_alarm_min, bearing7_vibration_vertical_warning_max, bearing7_vibration_vertical_warning_min) === 2 ? '' : checkValue(bearing7_vibration_vertical, bearing7_vibration_vertical_alarm_max, bearing7_vibration_vertical_alarm_min, bearing7_vibration_vertical_warning_max, bearing7_vibration_vertical_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>O, мм/c</p>
                <p>{bearing7_vibration_vertical.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N7-box ${ColorBoxCount(bearing7_HeatingTem_temperature, bearing7_vibration_axial, bearing7_vibration_horizontal, bearing7_vibration_vertical)}`}>7</div>

          {/* 6 */}
          <div className="exhauster-story__sensor-N6">
            <div className="exhauster-story__sensor-N6-head">6 ПС</div>
            <div className="exhauster-story__sensor-N6-body">
              <div className={`exhauster-story__sensor-N6-body-date ${checkValue(bearing6_HeatingTem_temperature, bearing6_HeatingTem_alarm_max, bearing6_HeatingTem_alarm_min, bearing6_HeatingTem_warning_max, bearing6_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing6_HeatingTem_temperature, bearing6_HeatingTem_alarm_max, bearing6_HeatingTem_alarm_min, bearing6_HeatingTem_warning_max, bearing6_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing6_HeatingTem_temperature.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N6-box ${ColorBoxCount(bearing6_HeatingTem_temperature)}`}>6</div>

          {/* 5 */}
          <div className="exhauster-story__sensor-N5">
            <div className="exhauster-story__sensor-N5-head">5 ПС</div>
            <div className="exhauster-story__sensor-N5-body">
              <div className={`exhauster-story__sensor-N5-body-date ${checkValue(bearing5_HeatingTem_temperature, bearing5_HeatingTem_alarm_max, bearing5_HeatingTem_alarm_min, bearing5_HeatingTem_warning_max, bearing5_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing5_HeatingTem_temperature, bearing5_HeatingTem_alarm_max, bearing5_HeatingTem_alarm_min, bearing5_HeatingTem_warning_max, bearing5_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing5_HeatingTem_temperature.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N5-box ${ColorBoxCount(bearing5_HeatingTem_temperature)}`}>5</div>

          {/* 4 */}
          <div className="exhauster-story__sensor-N4">
            <div className="exhauster-story__sensor-N4-head">4 ПС</div>
            <div className="exhauster-story__sensor-N4-body">
              <div className={`exhauster-story__sensor-N4-body-date ${checkValue(bearing4_HeatingTem_temperature, bearing4_HeatingTem_alarm_max, bearing4_HeatingTem_alarm_min, bearing4_HeatingTem_warning_max, bearing4_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing4_HeatingTem_temperature, bearing4_HeatingTem_alarm_max, bearing4_HeatingTem_alarm_min, bearing4_HeatingTem_warning_max, bearing4_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing4_HeatingTem_temperature.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N4-box ${ColorBoxCount(bearing4_HeatingTem_temperature)}`}>4</div>

          {/* 3 */}
          <div className="exhauster-story__sensor-N3">
            <div className="exhauster-story__sensor-N3-head">3 ПС</div>
            <div className="exhauster-story__sensor-N3-body">
              <div className={`exhauster-story__sensor-N3-body-date ${checkValue(bearing3_HeatingTem_temperature, bearing3_HeatingTem_alarm_max, bearing3_HeatingTem_alarm_min, bearing3_HeatingTem_warning_max, bearing3_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing3_HeatingTem_temperature, bearing3_HeatingTem_alarm_max, bearing3_HeatingTem_alarm_min, bearing3_HeatingTem_warning_max, bearing3_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing3_HeatingTem_temperature.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N3-box ${ColorBoxCount(bearing3_HeatingTem_temperature)}`}>3</div>

          {/* 2 */}
          <div className="exhauster-story__sensor-N2">
            <div className="exhauster-story__sensor-N2-head">2 ПС</div>
            <div className="exhauster-story__sensor-N2-body">
              <div className={`exhauster-story__sensor-N2-body-date ${checkValue(bearing2_HeatingTem_temperature, bearing2_HeatingTem_alarm_max, bearing2_HeatingTem_alarm_min, bearing2_HeatingTem_warning_max, bearing2_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing2_HeatingTem_temperature, bearing2_HeatingTem_alarm_max, bearing2_HeatingTem_alarm_min, bearing2_HeatingTem_warning_max, bearing2_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing2_HeatingTem_temperature.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N2-body-date ${checkValue(bearing2_vibration_axial, bearing2_vibration_axial_alarm_max, bearing2_vibration_axial_alarm_min, bearing2_vibration_axial_warning_max, bearing2_vibration_axial_warning_min) === 2 ? '' : checkValue(bearing2_vibration_axial, bearing2_vibration_axial_alarm_max, bearing2_vibration_axial_alarm_min, bearing2_vibration_axial_warning_max, bearing2_vibration_axial_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>В, мм/c</p>
                <p>{bearing2_vibration_axial.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N2-body-date ${checkValue(bearing2_vibration_horizontal, bearing2_vibration_horizontal_alarm_max, bearing2_vibration_horizontal_alarm_min, bearing2_vibration_horizontal_warning_max, bearing2_vibration_horizontal_warning_min) === 2 ? '' : checkValue(bearing2_vibration_horizontal, bearing2_vibration_horizontal_alarm_max, bearing2_vibration_horizontal_alarm_min, bearing2_vibration_horizontal_warning_max, bearing2_vibration_horizontal_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>Г, мм/c</p>
                <p>{bearing2_vibration_horizontal.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N2-body-date ${checkValue(bearing2_vibration_vertical, bearing2_vibration_vertical_alarm_max, bearing2_vibration_vertical_alarm_min, bearing2_vibration_vertical_warning_max, bearing2_vibration_vertical_warning_min) === 2 ? '' : checkValue(bearing2_vibration_vertical, bearing2_vibration_vertical_alarm_max, bearing2_vibration_vertical_alarm_min, bearing2_vibration_vertical_warning_max, bearing2_vibration_vertical_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>O, мм/c</p>
                <p>{bearing2_vibration_vertical.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N2-box ${ColorBoxCount(bearing2_HeatingTem_temperature, bearing2_vibration_axial, bearing2_vibration_horizontal, bearing2_vibration_vertical)}`}>2</div>

          {/* 1 */}
          <div className="exhauster-story__sensor-N1">
            <div className="exhauster-story__sensor-N1-head">1 ПС</div>
            <div className="exhauster-story__sensor-N1-body">
              <div className={`exhauster-story__sensor-N1-body-date ${checkValue(bearing1_HeatingTem_temperature, bearing1_HeatingTem_alarm_max, bearing1_HeatingTem_alarm_min, bearing1_HeatingTem_warning_max, bearing1_HeatingTem_warning_min) === 2 ? '' : checkValue(bearing1_HeatingTem_temperature, bearing1_HeatingTem_alarm_max, bearing1_HeatingTem_alarm_min, bearing1_HeatingTem_warning_max, bearing1_HeatingTem_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>T,°C</p>
                <p>{bearing1_HeatingTem_temperature.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N1-body-date ${checkValue(bearing1_vibration_axial, bearing1_vibration_axial_alarm_max, bearing1_vibration_axial_alarm_min, bearing1_vibration_axial_warning_max, bearing1_vibration_axial_warning_min) === 2 ? '' : checkValue(bearing1_vibration_axial, bearing1_vibration_axial_alarm_max, bearing1_vibration_axial_alarm_min, bearing1_vibration_axial_warning_max, bearing1_vibration_axial_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>В, мм/c</p>
                <p>{bearing1_vibration_axial.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N1-body-date ${checkValue(bearing1_vibration_horizontal, bearing1_vibration_horizontal_alarm_max, bearing1_vibration_horizontal_alarm_min, bearing1_vibration_horizontal_warning_max, bearing1_vibration_horizontal_warning_min) === 2 ? '' : checkValue(bearing1_vibration_horizontal, bearing1_vibration_horizontal_alarm_max, bearing1_vibration_horizontal_alarm_min, bearing1_vibration_horizontal_warning_max, bearing1_vibration_horizontal_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>Г, мм/c</p>
                <p>{bearing1_vibration_horizontal.toFixed(2)}</p>
              </div>
              <div className={`exhauster-story__sensor-N1-body-date ${checkValue(bearing1_vibration_vertical, bearing1_vibration_vertical_alarm_max, bearing1_vibration_vertical_alarm_min, bearing1_vibration_vertical_warning_max, bearing1_vibration_vertical_warning_min) === 2 ? '' : checkValue(bearing1_vibration_vertical, bearing1_vibration_vertical_alarm_max, bearing1_vibration_vertical_alarm_min, bearing1_vibration_vertical_warning_max, bearing1_vibration_vertical_warning_min) === 1 ? 'sensor-color_warning' : 'sensor-color_critical'}`}>
                <p>O, мм/c</p>
                <p>{bearing1_vibration_vertical.toFixed(2)}</p>
              </div>
            </div>
          </div>
          <div className={`exhauster-story__sensor-N1-box ${ColorBoxCount(bearing1_HeatingTem_temperature, bearing1_vibration_axial, bearing1_vibration_horizontal, bearing1_vibration_vertical)}`} >1</div>


          {/* Датчики Охладителя */}
          <div className="exhauster-story__sensor-tem position_tem_1"
            style={{ width: `${getColorCooler({ cooler_oil_temperature_after })}px` }}>
            {cooler_oil_temperature_after.toFixed(0)} °C
          </div>
          <div className="exhauster-story__sensor-tem position_tem_2"
            style={{ width: `${getColorCooler({ cooler_oil_temperature_before })}px` }}>
            {cooler_oil_temperature_before.toFixed(0)} °C
          </div>
          <div className="exhauster-story__sensor-tem position_tem_3"
            style={{ width: `${getColorCooler({ cooler_water_temperature_after })}px` }}>
            {cooler_water_temperature_after.toFixed(0)} °C
          </div>
          <div className="exhauster-story__sensor-tem position_tem_4"
            style={{ width: `${getColorCooler({ cooler_water_temperature_before })}px` }}>
            {cooler_water_temperature_before.toFixed(0)} °C
          </div>

          {/* Главный привод  */}
          <div className="exhauster-story__sensor-drive">
            <div className="exhauster-story__sensor-drive-head"><h4>Главный привод</h4></div>
            <div className="exhauster-story__sensor-drive-body">
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Ток, А</p>
                <div style={{ backgroundColor: `${getMainRotorCurrent(main_drive_rotor_current, localStorage.exhausterId)}` }}>
                  {main_drive_rotor_current}
                </div>
              </div>
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Ток двитагеля, А</p>
                <div style={{ backgroundColor: `${getMainStatorCurrent(main_drive_stator_current)}` }}>
                  {main_drive_stator_current.toFixed(2)}
                </div>
              </div>
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Напряжение ротера, кВт</p>
                <div>
                  {main_drive_rotor_voltage}
                </div>
              </div>
              <div className="exhauster-story__sensor-drive-body-date">
                <p>Напряжение статера, кВт</p>
                <div>
                  {main_drive_stator_voltage}
                </div>
              </div>
            </div>
          </div>

          {/* Редуктор */}
          <div className="exhauster-story__sensor-reducer"><h4>Редуктор</h4></div>

          {/* Охладитель */}
          <div className="exhauster-story__sensor-cooler"><h4>Охладитель</h4></div>

          {/* Маслобак */}
          <div className="exhauster-story__sensor-oil"><h4>Маслобак</h4></div>

          {/* Газовый коллектор */}
          <div className="exhauster-story__sensor-gas">
            <div className="exhauster-story__sensor-gas-body">
              <div className="exhauster-story__sensor-gas-body-date">
                <p>разряжение, мм в ст</p>
                <span>{gas_manifold_underpressure_before.toFixed(2)}</span>
              </div>
              <div className="exhauster-story__sensor-gas-body-date">
                <p>уровень газа, кг/м³</p>
                <span>20</span>
              </div>
            </div>
          </div>

          {/* Заглушка */}
          <div className="exhauster-story__sensor-gate-valve">
            <img src={gateValve} alt='Exhauster' />
          </div>
          {/* Линия заглушки */}
          <div className="exhauster-story__sensor-gate-valve-line">
            <div className="exhauster-story__sensor-gate-valve-line-start" style={{ width: `${getPositionGateValve({ gas_valve_position })}px` }}></div>
          </div>

          {/* Графики */}
          {/* График Газовый коллектор */}
          <div style={{ width: `${setGasTemp(gas_manifold_temperature_before, factorGasTemp, maxGasTemp)}px` }}
            className={`exhauster-story__sensor-graph-gas ${colorGraph_GasTemp(gas_manifold_temperature_before)}`}>
            <p>температура газа, °C</p>
            <span>{gas_manifold_temperature_before.toFixed(2)}</span>
          </div>

          {/* График Маслосистема */}
          <div style={{ width: `${setGasTemp(oil_system_oil_level, factorOilLevl, maxOilLevl)}px` }}
            className={`exhauster-story__sensor-graph-oil ${colorGraph_OilLevl(oil_system_oil_level)}`}>
            <p>уровень масла, %C</p>
            <span>{oil_system_oil_level.toFixed(1)}</span>
          </div>

          {/* График Давление масла */}
          <div style={{ width: `${setGasTemp(oil_system_oil_pressure, factorOilPressure, maxOilPressure)}px` }}
            className={`exhauster-story__sensor-graph-pressure ${colorGraph_OilPressure(oil_system_oil_pressure, localStorage.exhausterId)}`}>
            <p>давление масла, кг/cм²</p>
            <span>{(oil_system_oil_pressure).toFixed(1)}</span>
          </div>

          <div className="exhauster-story__sensor-name position_tem_5">Из КБЦ</div>
          <div className="exhauster-story__sensor-name position_tem_6">{gas_valve_position} %</div>
          <div className="exhauster-story__sensor-name position_tem_7">В дымовую трубу</div>
        </div>
      </div>

    </div>

  );
}

export default ExhausterPage;
