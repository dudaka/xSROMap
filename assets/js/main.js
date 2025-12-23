/*
 * Initialize xSROMap
 */

xSROMap.init('map');
// Add NPC's: [ { name , x , z , y , region, teleport : [ { name , x , z , y , region } , ... ] } , ...]
var NPCs = [
  {
    name: 'A Cốt - Thợ rèn',
    region: 26265,
    x: 1197.6899,
    z: -106.67,
    y: 1217.7,
    teleport: [],
  },
  {
    name: 'A Lực Mộc - Trưởng tiêu cục',
    region: 23688,
    x: 328.88,
    z: 20.0,
    y: 1553.96,
    teleport: [],
  },
  {
    name: 'A Na Sa - Người dân trong thôn',
    region: 23155,
    x: 739.46997,
    z: 2505.3101,
    y: 782.83002,
    teleport: [],
  },
  {
    name: 'A Sử Đức - Thương gia',
    region: 26265,
    x: 393.06,
    z: -106.62,
    y: 1560.3101,
    teleport: [],
  },
  {
    name: 'A Trân - Ca nữ',
    region: 24999,
    x: 793.90997,
    z: -3.45,
    y: 1033.92,
    teleport: [],
  },
  {
    name: 'A Trân - Ca nữ',
    region: 29899,
    x: 355.70001,
    z: -126.07,
    y: 389.12,
    teleport: [],
  },
  {
    name: 'A Y San - Quản kho',
    region: 23687,
    x: 1134.28,
    z: 243.75,
    y: 610.78998,
    teleport: [],
  },
  {
    name: 'Abubark - Chủ tiệm thuốc',
    region: 22361,
    x: 434.17999,
    z: -431.94,
    y: 1670.5,
    teleport: [],
  },
  {
    name: 'Abutalip - Thương gia',
    region: 22617,
    x: 536.96997,
    z: -432.64001,
    y: 1284.99,
    teleport: [],
  },
  {
    name: 'Adria - Trưởng tiêu cục',
    region: 27214,
    x: 1091.91,
    z: 79.989998,
    y: 154.23,
    teleport: [],
  },
  {
    name: 'Ahha - Người quản lý thư viện',
    region: 23345,
    x: 809.51001,
    z: 1401.0,
    y: 1081.63,
    teleport: [],
  },
  {
    name: 'Ahu - Binh lính',
    region: 27499,
    x: 116.52,
    z: 180.0,
    y: 190.25,
    teleport: [],
  },
  {
    name: 'Alex - Binh lính',
    region: 26957,
    x: 1313.91,
    z: 79.0,
    y: 1408.13,
    teleport: [],
  },
  {
    name: 'Aptaru - Lính Ai Cập',
    region: 23603,
    x: 1326.97,
    z: 1559.98,
    y: 759.94,
    teleport: [],
  },
  {
    name: 'Aryoan - Thương nhân buôn giáp',
    region: 27499,
    x: 1298.11,
    z: 180.0,
    y: 358.28,
    teleport: [],
  },
  {
    name: 'Asa - Người bán vé đò',
    region: 23183,
    x: 275.92001,
    z: -25.639999,
    y: 888.48999,
    teleport: [
      {
        name: 'Asimo - Người bán vé đò',
        region: 23180,
        x: 1413,
        z: -37,
        y: 769,
      },
    ],
  },
  {
    name: 'Asagon - Quản kho',
    region: 23603,
    x: 462.17001,
    z: 1530.2,
    y: 240.59,
    teleport: [],
  },
  {
    name: 'Asahap - Binh lính',
    region: 27499,
    x: 116.52,
    z: 180.0,
    y: 60.07,
    teleport: [],
  },
  {
    name: 'Asaman - Hội trưởng thương hội',
    region: 23687,
    x: 1574.02,
    z: 243.81,
    y: 840.15997,
    teleport: [],
  },
  {
    name: 'Asimo - Người bán vé đò',
    region: 23180,
    x: 1644.16,
    z: -32.060001,
    y: 752.78998,
    teleport: [
      { name: 'Asa - Người bán vé đò', region: 23183, x: 464, z: -57, y: 879 },
    ],
  },
  {
    name: 'Ba Ca - Chủ tiệm chế tác ngọc',
    region: 24200,
    x: 375.39001,
    z: -16.18,
    y: 659.09998,
    teleport: [],
  },
  {
    name: 'Ba Ngô Nhĩ Giang - Binh lính',
    region: 23943,
    x: 1199.22,
    z: 145.00999,
    y: 1607.86,
    teleport: [],
  },
  {
    name: 'Ba Nhật Đề - Binh lính',
    region: 23686,
    x: 1072.6899,
    z: 13.43,
    y: 420.76001,
    teleport: [],
  },
  {
    name: 'Bajel - Người bán hàng tạp hóa',
    region: 26959,
    x: 699.15002,
    z: 80.0,
    y: 253.89,
    teleport: [],
  },
  {
    name: 'Bakara - Người quản lý trao đổi item liên minh Thương Nhân/Bảo Tiêu',
    region: 23344,
    x: 1137.4399,
    z: 936.0,
    y: 1608.41,
    teleport: [],
  },
  {
    name: 'Balbardo - Lái buôn vũ khí',
    region: 26959,
    x: 784.69,
    z: 83.459999,
    y: 1532.71,
    teleport: [],
  },
  {
    name: 'Barus - Kẻ buôn lậu',
    region: 27243,
    x: 1424.25,
    z: 180.0,
    y: 458.57999,
    teleport: [],
  },
  {
    name: 'Berenice',
    region: -32752,
    x: 7592.0098,
    z: 111.56,
    y: 55.549999,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Anet',
    region: 26202,
    x: 1630.45,
    z: 0.0,
    y: 1736.63,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Asoho',
    region: 24469,
    x: 1135.27,
    z: 24.709999,
    y: 1798.21,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Augustin',
    region: 25930,
    x: 1166.35,
    z: -0.70999998,
    y: 1139.9,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Bob',
    region: 27983,
    x: 82.879997,
    z: 147.25,
    y: 1037.59,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Caleb',
    region: 26229,
    x: 613.15002,
    z: 198.00999,
    y: 1735.59,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Chahamma',
    region: 23682,
    x: 1579.78,
    z: 611.66998,
    y: 1535.88,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Chase',
    region: 25930,
    x: 1069.75,
    z: -1.42,
    y: 1074.29,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Chi Hu Dai',
    region: 22653,
    x: 352.20001,
    z: 857.53003,
    y: 710.83002,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Dan Xie',
    region: 23972,
    x: 1027.49,
    z: 546.78003,
    y: 635.12,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Dao Hu',
    region: 25244,
    x: 445.07999,
    z: 71.970001,
    y: 1579.85,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Dao Lian Hong',
    region: 25491,
    x: 1653.87,
    z: 40.09,
    y: 589.15997,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Dave',
    region: 27983,
    x: 203.89999,
    z: 146.71001,
    y: 1034.04,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn De Allo',
    region: 25956,
    x: 564.83002,
    z: 180.0,
    y: 308.75,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Dexter',
    region: 26478,
    x: 115.7,
    z: 177.24001,
    y: 548.78003,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Duadi',
    region: 26202,
    x: 1634.14,
    z: 2.1800001,
    y: 1833.45,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Hadaz',
    region: 23435,
    x: 1401.21,
    z: 16.790001,
    y: 1265.0601,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn He Zhi Hu',
    region: 25244,
    x: 412.35999,
    z: 70.07,
    y: 1699.95,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Hu Ma Long',
    region: 23682,
    x: 1690.66,
    z: 610.59998,
    y: 1526.84,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Iz',
    region: 24490,
    x: 704.78998,
    z: 20.27,
    y: 489.07001,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Ji He Long',
    region: 26260,
    x: 509.62,
    z: 30.77,
    y: 1782.1801,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Juana',
    region: 26977,
    x: 751.77002,
    z: 179.67999,
    y: 708.28998,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Liao Xiao Jun',
    region: 26267,
    x: 1039.01,
    z: -88.809998,
    y: 1313.71,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Ma Lian Hong',
    region: 24469,
    x: 1170.37,
    z: 97.889999,
    y: 1692.6,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Marcel',
    region: 27717,
    x: 1160.5699,
    z: -134.97,
    y: 1492.37,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Qin jia Qong',
    region: 23972,
    x: 1027.34,
    z: 566.09998,
    y: 499.87,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Rabbath',
    region: 25223,
    x: 1337.53,
    z: 113.29,
    y: 1790.42,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Racus',
    region: 26977,
    x: 866.82001,
    z: 179.94,
    y: 629.08002,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Ramadin',
    region: 25491,
    x: 1704.95,
    z: 42.330002,
    y: 687.95001,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Ramina',
    region: 25956,
    x: 650.15002,
    z: 180.0,
    y: 345.17999,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Ru Li Mao',
    region: 26260,
    x: 535.62,
    z: 38.619999,
    y: 1892.99,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Sao Ma',
    region: 25223,
    x: 1343.8,
    z: 114.32,
    y: 1657.85,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Shaha',
    region: 22653,
    x: 227.39999,
    z: 864.0,
    y: 708.69,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Shao Mu Dai',
    region: 26267,
    x: 1138.86,
    z: -88.779999,
    y: 1420.0699,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Wei Mao',
    region: 24221,
    x: 129.61,
    z: 406.5,
    y: 571.57001,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Wei Yen',
    region: 24490,
    x: 582.14001,
    z: 21.17,
    y: 487.13,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Yan Sang Li',
    region: 24221,
    x: 93.139999,
    z: 404.54999,
    y: 447.64001,
    teleport: [],
  },
  {
    name: 'Binh sĩ tiền đồn Yang Yen',
    region: 23435,
    x: 1361.3101,
    z: 26.23,
    y: 1170.89,
    teleport: [],
  },
  {
    name: 'Blackbeard - Hải tặc',
    region: 25945,
    x: 1323.33,
    z: 26.93,
    y: 999.60999,
    teleport: [
      {
        name: 'Gale - Người quản lý cảng',
        region: 25163,
        x: 734,
        z: -184,
        y: 168,
      },
      {
        name: 'Marwa - Người quản lý cảng',
        region: 23856,
        x: 1525,
        z: 585,
        y: 1688,
      },
    ],
  },
  {
    name: 'Buôn ngựa Ali',
    region: 22874,
    x: 289.39001,
    z: -430.72,
    y: 815.17999,
    teleport: [],
  },
  {
    name: 'Bá Nhạc Ngô',
    region: 26265,
    x: 358.28,
    z: -103.26,
    y: 468.01001,
    teleport: [],
  },
  {
    name: 'Bá Đô - Quản kho',
    region: 26265,
    x: 1260.35,
    z: -105.81,
    y: 696.84003,
    teleport: [],
  },
  {
    name: 'Bác sĩ Footco',
    region: 23498,
    x: 151.64999,
    z: -209.27,
    y: 1791.8,
    teleport: [],
  },
  {
    name: 'Băng cướp Hắc Mạc',
    region: 24758,
    x: 1247.88,
    z: -27.549999,
    y: 1073.61,
    teleport: [],
  },
  {
    name: 'Bạch Lý Cách - Binh lính',
    region: 26265,
    x: 965.58002,
    z: -105.45,
    y: 268.07999,
    teleport: [],
  },
  {
    name: 'Bảo Lực Cách - Binh lính',
    region: 23688,
    x: 1253.97,
    z: 13.65,
    y: 532.02002,
    teleport: [],
  },
  {
    name: 'Bộ Khắc La - Trưởng thôn',
    region: 23411,
    x: 971.28003,
    z: 2555.6201,
    y: 55.950001,
    teleport: [],
  },
  {
    name: 'Bộ Lợi - Thầy thuốc',
    region: 26265,
    x: 597.25,
    z: -106.46,
    y: 1134.97,
    teleport: [],
  },
  {
    name: 'Chu Hổ',
    region: 25255,
    x: 1491.36,
    z: 40.0,
    y: 1520.0699,
    teleport: [],
  },
  {
    name: 'Chu Linh - Ca nữ',
    region: 24999,
    x: 1500.02,
    z: 0.0,
    y: 966.16998,
    teleport: [],
  },
  {
    name: 'Chunmoo - Thương nhân buôn vũ khí',
    region: 23346,
    x: 648.39001,
    z: 1310.96,
    y: 1730.5,
    teleport: [],
  },
  {
    name: 'Chỉ huy quân viễn chinh Pakrun',
    region: 22101,
    x: 322.76001,
    z: 0.0,
    y: 928.84998,
    teleport: [],
  },
  {
    name: 'Chỉ huy trinh sát Syujaatun',
    region: 22611,
    x: 858.20001,
    z: 63.82,
    y: 819.56,
    teleport: [],
  },
  {
    name: 'Chủ trang trại Mujariun',
    region: 22357,
    x: 1914.89,
    z: -0.19,
    y: 1286.52,
    teleport: [],
  },
  {
    name: 'Cáp Lý Khắc - Trưởng thương hội',
    region: 26265,
    x: 446.66,
    z: -106.68,
    y: 1560.8199,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 17736,
    x: 1520.12,
    z: 39.990002,
    y: 1514.85,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 17990,
    x: 353.53,
    z: 40.0,
    y: 597.38,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 17735,
    x: 370.66,
    z: 0.0,
    y: 420.91,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 17488,
    x: 428.17001,
    z: 1377.62,
    y: 254.09,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 17230,
    x: 803.98999,
    z: 1385.22,
    y: 1801.6899,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 15431,
    x: 1065.03,
    z: 12.28,
    y: 248.14,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 15174,
    x: 901.65997,
    z: 11.72,
    y: 534.92999,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 15429,
    x: 1224.97,
    z: 11.66,
    y: 695.96997,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 15709,
    x: 250.55,
    z: 0.0,
    y: 1497.63,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 16222,
    x: 180.64999,
    z: 0.0,
    y: 84.059998,
    teleport: [],
  },
  {
    name: 'Cầu treo',
    region: 15966,
    x: 217.86,
    z: 0.0,
    y: 1557.59,
    teleport: [],
  },
  {
    name: 'Cổ Ni Sa - Thương nhân buôn giáp',
    region: 23687,
    x: 578.13,
    z: 243.81,
    y: 188.5,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32751,
    x: 1134.79,
    z: 0.0,
    y: -864.28998,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 32484,
    x: 896.23999,
    z: 692.15997,
    y: 1122.54,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 31459,
    x: 395.92999,
    z: 792.46997,
    y: 1775.33,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8398,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.0,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8301,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.1,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8198,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.2,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8101,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.3,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8501,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.4,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8599,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.5,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8701,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.6,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: 10751.49,
    z: 165.72,
    y: -6106.8799,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: -32750,
    x: -705.59003,
    z: 143.81,
    y: 1233.7,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 29427,
    x: 183.05,
    z: -780.0,
    y: 1578.78,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28663,
    x: 1899.23,
    z: -981.0,
    y: 1261.78,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 29427,
    x: 183.05,
    z: -781.0,
    y: 1578.79,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28663,
    x: 1899.23,
    z: -982.0,
    y: 1261.77,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28644,
    x: 1484.15,
    z: -257.0,
    y: 1670.58,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28644,
    x: 1484.15,
    z: -257.0,
    y: 1664.58,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 29427,
    x: 183.05,
    z: -780.0,
    y: 1578.77,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28663,
    x: 1899.23,
    z: -981.0,
    y: 1261.76,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 29427,
    x: 183.05,
    z: -780.0,
    y: 1578.76,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28663,
    x: 1899.23,
    z: -981.0,
    y: 1261.75,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28644,
    x: 1484.15,
    z: -257.0,
    y: 1670.5601,
    teleport: [],
  },
  {
    name: 'Cổng thoát hiểm',
    region: 28644,
    x: 1484.15,
    z: -257.0,
    y: 1670.55,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 32484,
    x: 1196.37,
    z: 700.25,
    y: 975.59998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31717,
    x: 1153.0699,
    z: 647.35999,
    y: 1763.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31972,
    x: 453.45001,
    z: 765.87,
    y: 1741.91,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 31715,
    x: 295.25,
    z: 790.47998,
    y: 447.28,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1099,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3301,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8799,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.46,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8799,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1201,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8701,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.45,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8899,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3401,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1299,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8599,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.4399,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8701,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3501,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1401,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8501,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.4301,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8601,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3601,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1499,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8398,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.42,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8501,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3701,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1602,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8301,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.41,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8401,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3799,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1699,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8198,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.47,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8301,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3899,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 10894.34,
    z: 159.52,
    y: -6258.1802,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -3780.97,
    z: 78.559998,
    y: -7943.8101,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7537.9902,
    z: 78.510002,
    y: -1848.48,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: -7107.79,
    z: 161.58,
    y: 3290.8201,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: -32750,
    x: 2033.92,
    z: 78.510002,
    y: -3925.3201,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 29427,
    x: 330.04999,
    z: -780.0,
    y: 1412.03,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28657,
    x: 1771.6801,
    z: -870.0,
    y: 1231.4,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 27636,
    x: 1273.95,
    z: -850.0,
    y: 283.06,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28920,
    x: 786.23999,
    z: -890.0,
    y: 155.84,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 29427,
    x: 330.04999,
    z: -781.0,
    y: 1412.04,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 27636,
    x: 1273.95,
    z: -851.0,
    y: 283.03,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28920,
    x: 786.23999,
    z: -891.0,
    y: 155.85001,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28657,
    x: 1771.6801,
    z: -871.0,
    y: 1231.5,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28644,
    x: 1414.29,
    z: -255.0,
    y: 1575.16,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28647,
    x: 1860.7,
    z: -220.0,
    y: 1262.04,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28640,
    x: 478.26001,
    z: -120.0,
    y: 650.95001,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28644,
    x: 1414.29,
    z: -255.0,
    y: 1575.15,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28640,
    x: 478.26001,
    z: -120.0,
    y: 650.96002,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28647,
    x: 1860.7,
    z: -220.0,
    y: 1262.05,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 29427,
    x: 330.04999,
    z: -780.0,
    y: 1412.05,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 27636,
    x: 1273.95,
    z: -850.0,
    y: 283.04001,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28920,
    x: 786.23999,
    z: -890.0,
    y: 155.86,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28657,
    x: 1771.6801,
    z: -870.0,
    y: 1231.6,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 29427,
    x: 330.04999,
    z: -780.0,
    y: 1412.0601,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 27636,
    x: 1273.95,
    z: -850.0,
    y: 283.04999,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28920,
    x: 786.23999,
    z: -890.0,
    y: 155.87,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28657,
    x: 1771.6801,
    z: -870.0,
    y: 1231.7,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28644,
    x: 1414.29,
    z: -255.0,
    y: 1575.14,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28647,
    x: 1860.7,
    z: -220.0,
    y: 1262.0601,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28640,
    x: 478.26001,
    z: -120.0,
    y: 650.96997,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28644,
    x: 1414.29,
    z: -255.0,
    y: 1575.13,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28640,
    x: 478.26001,
    z: -120.0,
    y: 650.97998,
    teleport: [],
  },
  {
    name: 'Cột triệu hồi của thành viên nhóm',
    region: 28647,
    x: 1860.7,
    z: -220.0,
    y: 1262.0699,
    teleport: [],
  },
  {
    name: 'Dohwa - Binh lính',
    region: 27243,
    x: 1862.65,
    z: 180.0,
    y: 218.23,
    teleport: [],
  },
  {
    name: 'Dubai - Kẻ buôn lậu',
    region: 22363,
    x: 845.83002,
    z: -319.95999,
    y: 999.60999,
    teleport: [],
  },
  {
    name: 'Dân làng Itzak',
    region: 22107,
    x: 126.92,
    z: -433.28,
    y: 1473.71,
    teleport: [],
  },
  {
    name: 'Dân làng Nazima',
    region: 22361,
    x: 925.90997,
    z: -432.13,
    y: 265.14999,
    teleport: [],
  },
  {
    name: 'Dân làng Phuad',
    region: 22875,
    x: 972.06,
    z: -430.56,
    y: 548.69,
    teleport: [],
  },
  {
    name: "Dân làng Sa'adatun",
    region: 22107,
    x: 969.20001,
    z: -433.28,
    y: 1536.98,
    teleport: [],
  },
  {
    name: 'Dân làng Yamain',
    region: 22106,
    x: 1285.73,
    z: -432.13,
    y: 769.21997,
    teleport: [],
  },
  {
    name: 'Dân làng Zvaida',
    region: 22107,
    x: 457.10999,
    z: -433.28,
    y: 1648.6,
    teleport: [],
  },
  {
    name: 'Dương ích Chi - Thầy thuốc',
    region: 25000,
    x: 1584.08,
    z: 0.0,
    y: 1407.29,
    teleport: [],
  },
  {
    name: 'Elia - Quản lý các hội',
    region: 23347,
    x: 194.28,
    z: 1402.9,
    y: 1447.84,
    teleport: [],
  },
  {
    name: 'Gale - Người quản lý cảng',
    region: 25163,
    x: 958.04999,
    z: -155.03999,
    y: 98.970001,
    teleport: [
      { name: 'Morgun - Hải tặc', region: 26457, x: 1254, z: -9, y: 1114 },
      { name: 'Blackbeard - Hải tặc', region: 25945, x: 1246, z: -5, y: 1210 },
      {
        name: 'Marwa - Người quản lý cảng',
        region: 23856,
        x: 1525,
        z: 585,
        y: 1688,
      },
    ],
  },
  {
    name: 'Georion - Người quản lý cảng',
    region: 26960,
    x: 1522.87,
    z: -27.59,
    y: 67.400002,
    teleport: [],
  },
  {
    name: 'Gilt - Người quản lý hội',
    region: 26704,
    x: 77.739998,
    z: -143.96001,
    y: 250.19,
    teleport: [],
  },
  {
    name: 'Già làng Kerim',
    region: 22106,
    x: 349.45001,
    z: -432.13,
    y: 1509.2,
    teleport: [
      { name: 'Baghdad (Phụ bản)', region: 23636, x: 1577, z: -430, y: 1105 },
    ],
  },
  {
    name: 'Giáo sĩ Gabriel',
    region: 27216,
    x: 1734.83,
    z: 283.73999,
    y: 880.71002,
    teleport: [],
  },
  {
    name: 'Ha La Hồ - Trưởng tiêu cục',
    region: 26521,
    x: 599.57001,
    z: -106.25,
    y: 637.78998,
    teleport: [],
  },
  {
    name: 'Hapsa - Quản lý hội',
    region: 27500,
    x: 138.78999,
    z: 180.0,
    y: 910.38,
    teleport: [],
  },
  {
    name: 'Hassan - Trưởng thương hội',
    region: 22617,
    x: 1525.9399,
    z: -432.38,
    y: 79.93,
    teleport: [],
  },
  {
    name: 'Hemaka - Thương nhân buôn vũ khí',
    region: 23087,
    x: 1572.84,
    z: 863.31,
    y: 1069.86,
    teleport: [],
  },
  {
    name: 'Hoa Trọng Sinh - Trưởng thương hội',
    region: 25000,
    x: 1760.84,
    z: 11.0,
    y: 357.51001,
    teleport: [],
  },
  {
    name: 'Hoyun - Lái buôn ngựa',
    region: 27500,
    x: 686.56,
    z: 180.0,
    y: 246.67,
    teleport: [],
  },
  {
    name: 'Hujaan - Thương gia buôn hàng đặc biệt',
    region: 21833,
    x: 1384.3,
    z: -49.349998,
    y: 304.78,
    teleport: [],
  },
  {
    name: 'Hà Càn -  Người bán vé đò',
    region: 25244,
    x: 919.71997,
    z: 69.370003,
    y: 366.88,
    teleport: [
      {
        name: 'Hạ Vũ - Người bán vé đò',
        region: 24734,
        x: 523,
        z: 140,
        y: 1267,
      },
    ],
  },
  {
    name: 'Hà Khang - Quản lý các hội',
    region: 26265,
    x: 1354.42,
    z: -104.74,
    y: 448.95001,
    teleport: [],
  },
  {
    name: 'Hòa thượng Định Huệ - Chùa Từ Ân',
    region: 25257,
    x: 659.73999,
    z: 0.0,
    y: 981.13,
    teleport: [],
  },
  {
    name: 'Hương Ngọc - Ca nữ',
    region: 24999,
    x: 772.72998,
    z: -2.1199999,
    y: 1045.6899,
    teleport: [],
  },
  {
    name: 'Hạ Vũ - Người bán vé đò',
    region: 24734,
    x: 330.34,
    z: 61.889999,
    y: 1606.66,
    teleport: [
      {
        name: 'Hà Càn -  Người bán vé đò',
        region: 25244,
        x: 1025,
        z: 160,
        y: 601,
      },
    ],
  },
  {
    name: 'Học Giả Lịch Sử cổ đại',
    region: 23687,
    x: 1285.11,
    z: 243.81,
    y: 31.190001,
    teleport: [
      { name: 'Đá dịch chuyển', region: -32740, x: 967, z: -134, y: 1234 },
      { name: 'Đá dịch chuyển', region: -32741, x: 967, z: -134, y: 1234 },
    ],
  },
  {
    name: 'Học Giả Lịch Sử cổ đại',
    region: 22106,
    x: 1680.2,
    z: -433.28,
    y: 1829.98,
    teleport: [
      { name: 'Đá dịch chuyển', region: -32740, x: 967, z: -134, y: 1234 },
      { name: 'Đá dịch chuyển', region: -32741, x: 967, z: -134, y: 1234 },
    ],
  },
  {
    name: 'Hồ Khang - Binh lính',
    region: 25255,
    x: 334.98999,
    z: -0.28,
    y: 34.18,
    teleport: [
      { name: 'Thôi Bình - Binh lính', region: 25000, x: 976, z: -6, y: 1834 },
      {
        name: 'Thượng Quan Nam - Binh lính',
        region: 25001,
        x: 1340,
        z: 0,
        y: 1817,
      },
      { name: 'Trần Kiên - Binh lính', region: 25000, x: 983, z: 0, y: 77 },
    ],
  },
  {
    name: 'Hồ Nguyệt ảnh',
    region: 25001,
    x: 859.03998,
    z: 0.0,
    y: 1069.34,
    teleport: [],
  },
  {
    name: 'Hổ Ân Nhi -Thương gia buôn hàng đặc biệt',
    region: 23445,
    x: 1132.42,
    z: 192.99001,
    y: 833.71997,
    teleport: [],
  },
  {
    name: 'Hỗn Vô Tà',
    region: 26265,
    x: 457.67001,
    z: -103.37,
    y: 468.51999,
    teleport: [],
  },
  {
    name: 'Hội Chủ hội Đạo Tặc Obad',
    region: 22363,
    x: 903.09998,
    z: -319.92001,
    y: 1383.15,
    teleport: [],
  },
  {
    name: 'Hội trưởng Kapros',
    region: 26702,
    x: 1116.2,
    z: 83.870003,
    y: 1007.45,
    teleport: [],
  },
  {
    name: 'Hội trưởng Uvetino',
    region: 26702,
    x: 591.77002,
    z: 83.860001,
    y: 479.32999,
    teleport: [],
  },
  {
    name: 'Hộp anh hùng',
    region: -32762,
    x: -18150.801,
    z: -47.240002,
    y: -5824.6401,
    teleport: [],
  },
  {
    name: 'Hộp dũng cảm',
    region: -32762,
    x: 18102.699,
    z: -47.240002,
    y: 5588.8501,
    teleport: [],
  },
  {
    name: 'Hộp gian khó',
    region: -32762,
    x: -18147.48,
    z: -47.240002,
    y: -29.969999,
    teleport: [],
  },
  {
    name: 'Hộp thử thách',
    region: -32762,
    x: 18101.07,
    z: -47.240002,
    y: -32.639999,
    teleport: [],
  },
  {
    name: 'Hợp Đôn - Binh lính',
    region: 26265,
    x: 1715.52,
    z: -106.7,
    y: 1863.1,
    teleport: [],
  },
  {
    name: 'Hứa Hổ An - Quản lý sòng bạc',
    region: 25001,
    x: 509.22,
    z: -64.830002,
    y: 755.23999,
    teleport: [],
  },
  {
    name: 'Hứa Phổ Lỗ - Nô lệ',
    region: 22131,
    x: 716.87,
    z: 3628.3601,
    y: 1097.73,
    teleport: [],
  },
  {
    name: 'I Sa Khắc - Thương nhân Ba Tư',
    region: 25000,
    x: 1670.6801,
    z: 11.0,
    y: 580.81,
    teleport: [],
  },
  {
    name: 'Isan - Người dân trong thôn',
    region: 23914,
    x: 1167.5,
    z: 2815.0801,
    y: 370.85001,
    teleport: [],
  },
  {
    name: 'Istaad - Kẻ buôn lậu',
    region: 23431,
    x: 920.19,
    z: 99.470001,
    y: 1074.83,
    teleport: [],
  },
  {
    name: 'Jatomo - Lái buôn giáp',
    region: 26958,
    x: 1910.98,
    z: 83.870003,
    y: 1083.46,
    teleport: [],
  },
  {
    name: 'Jooha - Binh lính',
    region: 27500,
    x: 1828.24,
    z: 180.0,
    y: 184.42,
    teleport: [],
  },
  {
    name: 'Justia - Binh lính',
    region: 26446,
    x: 920.73999,
    z: 82.019997,
    y: 1896.6801,
    teleport: [],
  },
  {
    name: 'Kaella - Thương gia buôn hàng đặc biệt',
    region: 19266,
    x: 1362.45,
    z: 31.809999,
    y: 3.2,
    teleport: [],
  },
  {
    name: 'Kamori - Lính Ai Cập',
    region: 23603,
    x: 1179.79,
    z: 1559.48,
    y: 989.85999,
    teleport: [],
  },
  {
    name: 'Kapra - Chủ hàng tạp hóa',
    region: 23602,
    x: 1225.1801,
    z: 1447.88,
    y: 529.21997,
    teleport: [],
  },
  {
    name: 'Karen - Hội thương nhân',
    region: 27244,
    x: 669.69,
    z: 180.0,
    y: 1823.29,
    teleport: [],
  },
  {
    name: 'Kartino - Binh lính',
    region: 26704,
    x: 652.34003,
    z: -27.6,
    y: 1690.0601,
    teleport: [{ name: 'Làng Đạo Tặc', region: 24758, x: 760, z: -28, y: 900 }],
  },
  {
    name: 'Kasius - Lính gác',
    region: 26959,
    x: 124.36,
    z: 80.0,
    y: 1775.11,
    teleport: [],
  },
  {
    name: 'Khamererne - Quản kho',
    region: 23089,
    x: 335.34,
    z: 777.65997,
    y: 798.67999,
    teleport: [],
  },
  {
    name: 'Kotomo - Lính gác',
    region: 27471,
    x: 1375.22,
    z: 80.0,
    y: 557.54999,
    teleport: [],
  },
  {
    name: 'Kushyan - Nhà sư ấn Độ',
    region: 25257,
    x: 692.15997,
    z: -0.02,
    y: 137.35001,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Barun',
    region: -32746,
    x: -561.53998,
    z: 1.11,
    y: 385.38,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Cieta',
    region: -32746,
    x: -4.1399999,
    z: 1.11,
    y: -586.65997,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Maadu',
    region: -32746,
    x: 298.89999,
    z: 1.11,
    y: 214.12,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Million',
    region: -32746,
    x: 986.71002,
    z: 1.11,
    y: -2342.25,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Nana',
    region: -32746,
    x: 454.95001,
    z: 1.11,
    y: 280.51001,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Nimae',
    region: -32746,
    x: 491.62,
    z: 1.11,
    y: 325.94,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Raduma',
    region: -32746,
    x: -541.01001,
    z: 1.11,
    y: 312.01001,
    teleport: [],
  },
  {
    name: 'Kẻ tôn kính Baal Walter',
    region: -32746,
    x: -266.22,
    z: 1.11,
    y: 178.89999,
    teleport: [],
  },
  {
    name: 'La Hán - Người bán vé đò',
    region: 23436,
    x: 1189.4,
    z: -22.49,
    y: 1324.5699,
    teleport: [
      {
        name: 'Sama - Người bán vé đò',
        region: 23439,
        x: 583,
        z: -22,
        y: 1858,
      },
    ],
  },
  {
    name: 'Lipria - Hướng dẫn viên',
    region: 27471,
    x: 1349.25,
    z: 82.699997,
    y: 412.72,
    teleport: [
      { name: 'Riise - Hướng dẫn viên', region: 26959, x: 542, z: 83, y: 1147 },
      {
        name: 'Raffy - Hướng dẫn viên',
        region: 26957,
        x: 1609,
        z: 80,
        y: 1381,
      },
    ],
  },
  {
    name: 'Liễu Mi - Ca nữ',
    region: 24999,
    x: 647.53003,
    z: 15.92,
    y: 367.54999,
    teleport: [],
  },
  {
    name: 'Luresia - Người quản lý trao đổi item liên minh Đạo Tặc',
    region: 23346,
    x: 1702.8,
    z: 1403.63,
    y: 1221.35,
    teleport: [],
  },
  {
    name: 'Lính Abdul Ali',
    region: 22106,
    x: 1688.71,
    z: -432.39001,
    y: 555.44,
    teleport: [],
  },
  {
    name: 'Lính Aziz',
    region: 22617,
    x: 1807.1,
    z: -432.54999,
    y: 339.92001,
    teleport: [],
  },
  {
    name: 'Lính Bari',
    region: 22617,
    x: 1809.47,
    z: -432.64001,
    y: 241.67999,
    teleport: [],
  },
  {
    name: 'Lính Basit',
    region: 22617,
    x: 244.49001,
    z: -432.29999,
    y: 542.97998,
    teleport: [],
  },
  {
    name: 'Lính Djabal',
    region: 22106,
    x: 1509.24,
    z: -432.44,
    y: 559.64001,
    teleport: [],
  },
  {
    name: 'Lính Djaman',
    region: 22620,
    x: 280.5,
    z: -430.5,
    y: 618.32001,
    teleport: [],
  },
  {
    name: 'Lính Hajib',
    region: 22874,
    x: 1337.86,
    z: -430.73001,
    y: 49.790001,
    teleport: [],
  },
  {
    name: 'Lính Harun',
    region: 22362,
    x: 1673.96,
    z: -433.28,
    y: 373.56,
    teleport: [],
  },
  {
    name: 'Lính Hindshind',
    region: 22362,
    x: 1551.83,
    z: -433.28,
    y: 375.42999,
    teleport: [],
  },
  {
    name: 'Lính Hoàng cung Alim',
    region: 22618,
    x: 1072.66,
    z: -236.59,
    y: 391.14999,
    teleport: [],
  },
  {
    name: 'Lính Hoàng cung Azim',
    region: 22362,
    x: 1317.03,
    z: -236.59,
    y: 1854.29,
    teleport: [],
  },
  {
    name: 'Lính Imanun',
    region: 22364,
    x: 449.17001,
    z: -430.5,
    y: 1422.4399,
    teleport: [],
  },
  {
    name: 'Lính Jaffar',
    region: 22875,
    x: 1642.12,
    z: -430.5,
    y: 13.14,
    teleport: [],
  },
  {
    name: "Lính Ka'ish",
    region: 22620,
    x: 253.83,
    z: -430.5,
    y: 741.02002,
    teleport: [],
  },
  {
    name: 'Lính Kaupun',
    region: 22364,
    x: 447.19,
    z: -430.48999,
    y: 1237.0601,
    teleport: [],
  },
  {
    name: 'Lính Moharet',
    region: 22874,
    x: 1505.63,
    z: -430.60999,
    y: 50.84,
    teleport: [],
  },
  {
    name: 'Lính Mutaqa Quatun',
    region: 22619,
    x: 1704.58,
    z: -430.5,
    y: 391.85001,
    teleport: [],
  },
  {
    name: 'Lính Mutaqa Trissun',
    region: 22619,
    x: 1705.3101,
    z: -430.5,
    y: 499.67001,
    teleport: [],
  },
  {
    name: 'Lính Patah',
    region: 22617,
    x: 243.66,
    z: -432.01001,
    y: 316.62,
    teleport: [],
  },
  {
    name: 'Lính tiếp tế Born',
    region: 23498,
    x: 143.06,
    z: -204.33,
    y: 1650.92,
    teleport: [],
  },
  {
    name: 'Lính trinh sát Amanun',
    region: 22611,
    x: 880.59003,
    z: 61.119999,
    y: 758.96997,
    teleport: [],
  },
  {
    name: 'Lính trinh sát Hadiun',
    region: 22611,
    x: 879.34998,
    z: 60.580002,
    y: 880.10999,
    teleport: [],
  },
  {
    name: 'Lính trinh sát Malarun',
    region: 21594,
    x: 1021.69,
    z: -322.92999,
    y: 1299.85,
    teleport: [],
  },
  {
    name: 'Lính trinh sát Nadamun',
    region: 21594,
    x: 1106.78,
    z: -331.54999,
    y: 1311.28,
    teleport: [],
  },
  {
    name: 'Lính viễn chinh Alamatun',
    region: 22101,
    x: 317.95999,
    z: 0.0,
    y: 990.62,
    teleport: [],
  },
  {
    name: 'Lính viễn chinh Muhibun',
    region: 22101,
    x: 375.60999,
    z: 0.0,
    y: 901.40002,
    teleport: [],
  },
  {
    name: 'Lôi Khắc Mộc - Binh lính',
    region: 23431,
    x: 1190.54,
    z: 13.24,
    y: 377.82999,
    teleport: [],
  },
  {
    name: 'Lý Bách Dũng - Quản lý các hội',
    region: 25255,
    x: 1027.0,
    z: 0.0,
    y: 569.78998,
    teleport: [],
  },
  {
    name: 'Lý Lang - Binh lính',
    region: 25001,
    x: 1387.87,
    z: 0.0,
    y: 1872.21,
    teleport: [],
  },
  {
    name: 'Lục Chu - Ca nữ',
    region: 24999,
    x: 1405.36,
    z: 0.70999998,
    y: 1192.83,
    teleport: [],
  },
  {
    name: 'Man Y Na - Thương nhân buôn dược liệu',
    region: 23687,
    x: 832.15997,
    z: 243.86,
    y: 1093.64,
    teleport: [],
  },
  {
    name: 'Maneto - Nhân viên tài chính',
    region: 23345,
    x: 650.95001,
    z: 1401.0,
    y: 1166.71,
    teleport: [],
  },
  {
    name: 'Mansuana - Người đại diện liên minh nghề nghiệp',
    region: -32752,
    x: 6353.9302,
    z: 69.849998,
    y: -19.65,
    teleport: [],
  },
  {
    name: 'Marwa - Người quản lý cảng',
    region: 23856,
    x: 1623.1801,
    z: 584.91998,
    y: 1794.8,
    teleport: [
      { name: 'Morgun - Hải tặc', region: 26457, x: 1254, z: -9, y: 1114 },
      { name: 'Blackbeard - Hải tặc', region: 25945, x: 1246, z: -5, y: 1210 },
      {
        name: 'Gale - Người quản lý cảng',
        region: 25163,
        x: 734,
        z: -184,
        y: 168,
      },
    ],
  },
  {
    name: 'Maximus - Binh lính',
    region: 26704,
    x: 798.08002,
    z: -27.6,
    y: 1804.39,
    teleport: [],
  },
  {
    name: 'Melit - Chủ hàng tạp hóa',
    region: 23088,
    x: 1245.35,
    z: 863.35999,
    y: 1053.9399,
    teleport: [],
  },
  {
    name: 'Mentuhotep - Bác Sỹ',
    region: -32752,
    x: 7636.0801,
    z: 111.56,
    y: 74.610001,
    teleport: [],
  },
  {
    name: 'Miêu Tố Linh - Thầy mo',
    region: 25253,
    x: 142.88,
    z: 225.84,
    y: 822.10999,
    teleport: [],
  },
  {
    name: 'Mobefe - Lính Ai Cập',
    region: 22833,
    x: 667.65002,
    z: 790.72998,
    y: 1199.3199,
    teleport: [],
  },
  {
    name: 'Mohaira - Người đại diện liên minh đạo tặc',
    region: -32752,
    x: 4378.3301,
    z: 67.470001,
    y: 4144.8301,
    teleport: [],
  },
  {
    name: 'Morgun - Hải tặc',
    region: 26457,
    x: 1330.52,
    z: 26.27,
    y: 908.75,
    teleport: [
      {
        name: 'Gale - Người quản lý cảng',
        region: 25163,
        x: 734,
        z: -184,
        y: 168,
      },
      {
        name: 'Marwa - Người quản lý cảng',
        region: 23856,
        x: 1525,
        z: 585,
        y: 1688,
      },
    ],
  },
  {
    name: 'Musai - Quản lý các hội',
    region: 24199,
    x: 1145.5601,
    z: 267.67001,
    y: 585.75,
    teleport: [],
  },
  {
    name: 'Mushari - Người bảo vệ Cung Điện',
    region: 23343,
    x: 1440.9399,
    z: 963.12,
    y: 174.46001,
    teleport: [],
  },
  {
    name: 'Mã Mộc Đề - Thợ đá quý',
    region: 23431,
    x: 859.33002,
    z: 243.81,
    y: 1874.0601,
    teleport: [],
  },
  {
    name: 'Mã Thiên Lý - Buôn ngựa',
    region: 25000,
    x: 329.20999,
    z: 0.0,
    y: 450.60001,
    teleport: [],
  },
  {
    name: 'Mạc Cao - Buôn ngựa',
    region: 26265,
    x: 1415.0699,
    z: -106.71,
    y: 1651.6899,
    teleport: [],
  },
  {
    name: 'Mạc Hãn - Binh lính',
    region: 23688,
    x: 1253.6899,
    z: 13.57,
    y: 432.42999,
    teleport: [],
  },
  {
    name: 'Mạo Hồ - Binh lính',
    region: 26521,
    x: 1715.15,
    z: -106.7,
    y: 40.759998,
    teleport: [],
  },
  {
    name: 'Naunakt - Chủ liên minh thương nhân',
    region: 23600,
    x: 798.62,
    z: 930.65997,
    y: 112.95,
    teleport: [],
  },
  {
    name: 'Nefret - Người bán ngựa',
    region: 23089,
    x: 867.84003,
    z: 856.5,
    y: 1644.05,
    teleport: [],
  },
  {
    name: 'Người buôn đồ ăn trộm',
    region: 24758,
    x: 953.41998,
    z: 3.6600001,
    y: 1227.63,
    teleport: [],
  },
  {
    name: 'Người bán vé thuyền bay Ajati',
    region: 24438,
    x: 1120.72,
    z: 2552.8101,
    y: 313.19,
    teleport: [
      { name: 'Bến bắc Karakolam', region: 23929, x: 862, z: 2105, y: 1623 },
      { name: 'Poy - Người bán vé', region: 22137, x: 1168, z: 2030, y: 824 },
      {
        name: 'Saena - Người bán vé phi thuyền',
        region: 25975,
        x: 1367,
        z: 296,
        y: 1626,
      },
    ],
  },
  {
    name: 'Người bán vé thuyền bay Sangnia',
    region: 24424,
    x: 1661.63,
    z: 3892.8301,
    y: 582.67999,
    teleport: [
      {
        name: 'Shard - Người bán vé thuyền bay',
        region: 24934,
        x: 1279,
        z: 587,
        y: 92,
      },
    ],
  },
  {
    name: 'Người bán vé thuyền bay Sayun',
    region: 22134,
    x: 919.96997,
    z: 2545.55,
    y: 1902.6,
    teleport: [
      { name: 'Bến bắc Karakolam', region: 23929, x: 862, z: 2105, y: 1623 },
      { name: 'Poy - Người bán vé', region: 22137, x: 1168, z: 2030, y: 824 },
    ],
  },
  {
    name: 'Người dẫn đường Asui',
    region: 26237,
    x: 158.16,
    z: 393.60999,
    y: 614.88,
    teleport: [
      {
        name: 'Topni - Người quản lý đường hầm',
        region: 27000,
        x: 1072,
        z: 598,
        y: 1822,
      },
    ],
  },
  {
    name: 'Người dẫn đường Cách mạng',
    region: 23662,
    x: 1755.89,
    z: 4078.5901,
    y: 59.09,
    teleport: [],
  },
  {
    name: 'Người dẫn đường Maryokuk',
    region: 25469,
    x: 183.17999,
    z: 256.87,
    y: 437.25,
    teleport: [
      {
        name: 'Saalhap - Người quản lý đường hầm',
        region: 26232,
        x: 1372,
        z: 183,
        y: 1844,
      },
    ],
  },
  {
    name: 'Người giao nhận hàng hóa của thương nhân',
    region: 25000,
    x: 1760.45,
    z: 11.0,
    y: 419.17001,
    teleport: [],
  },
  {
    name: 'Người giao nhận hàng hóa của thương nhân',
    region: 23687,
    x: 1490.73,
    z: 243.99001,
    y: 968.19,
    teleport: [],
  },
  {
    name: 'Người giao nhận hàng hóa của thương nhân',
    region: 26959,
    x: 17.18,
    z: 80.440002,
    y: 258.14999,
    teleport: [],
  },
  {
    name: 'Người hỗ trợ Titi',
    region: 23498,
    x: 116.36,
    z: -206.58,
    y: 1597.67,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Bolt',
    region: -32746,
    x: 2.47,
    z: 1.11,
    y: -653.84003,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Brandon',
    region: 23498,
    x: 279.39001,
    z: -206.0,
    y: 1758.8199,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Charles',
    region: 32236,
    x: 945.54999,
    z: 854.19,
    y: 662.79999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Chrom',
    region: 23498,
    x: 258.06,
    z: -210.14999,
    y: 1829.55,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Fernando',
    region: -32746,
    x: -22.66,
    z: 1.11,
    y: -323.98999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Geese',
    region: 32237,
    x: 135.66,
    z: 856.0,
    y: 1071.45,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Gote',
    region: 32236,
    x: 87.529999,
    z: 856.0,
    y: 1089.3101,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Jyss',
    region: 31724,
    x: 433.37,
    z: 1115.29,
    y: 745.15997,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Kaal',
    region: 31980,
    x: 827.28003,
    z: 992.0,
    y: 753.28003,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Leon',
    region: 31980,
    x: 901.03998,
    z: 950.0,
    y: 804.17999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Nell',
    region: 31980,
    x: 1026.89,
    z: 1067.0,
    y: 683.56,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Neon',
    region: -32746,
    x: 1238.27,
    z: 1.59,
    y: 846.35999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Nice',
    region: 31980,
    x: 751.98999,
    z: 992.0,
    y: 738.79999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Rice',
    region: 31980,
    x: 801.28003,
    z: 1115.52,
    y: 534.92999,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Rion',
    region: 31980,
    x: 1114.6801,
    z: 992.72998,
    y: 734.65002,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Rubel',
    region: 31980,
    x: 760.78998,
    z: 1038.0,
    y: 691.97998,
    teleport: [],
  },
  {
    name: 'Người lính mất tích Will',
    region: 22219,
    x: 696.31,
    z: 475.63,
    y: 1749.22,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 26959,
    x: 815.28003,
    z: 83.739998,
    y: 1150.3,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 25000,
    x: 1101.47,
    z: -32.09,
    y: 884.19,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 26265,
    x: 961.96002,
    z: -106.76,
    y: 1569.27,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 23687,
    x: 1159.13,
    z: 244.06,
    y: 370.25,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 23088,
    x: 437.60001,
    z: 862.0,
    y: 1258.38,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 27243,
    x: 1842.03,
    z: 180.0,
    y: 1662.1899,
    teleport: [],
  },
  {
    name: 'Người quản lý lễ hội Jooa',
    region: 22106,
    x: 1389.48,
    z: -420.28,
    y: 1488.4,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Ayareotun',
    region: 19279,
    x: 646.03003,
    z: -852.91998,
    y: 1590.46,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Dilun',
    region: 20566,
    x: 1305.0601,
    z: -487.63,
    y: 1648.1,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Parun',
    region: 20815,
    x: 402.79999,
    z: 202.64999,
    y: 646.69,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Pulassun',
    region: 20828,
    x: 840.15002,
    z: -192.66,
    y: 1736.08,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Sirun',
    region: 18769,
    x: 1383.05,
    z: -313.25,
    y: 695.84003,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Tahatdi',
    region: 20050,
    x: 444.04999,
    z: -703.22998,
    y: 1763.88,
    teleport: [],
  },
  {
    name: 'Người quản lý mật Tanahatun',
    region: 21079,
    x: 606.03998,
    z: -324.45999,
    y: 249.33,
    teleport: [],
  },
  {
    name: 'Nhiệt Tỷ á - Chủ cửa hàng giáp',
    region: 26265,
    x: 1196.42,
    z: -106.01,
    y: 901.38,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Trung hoa - Giáng Thiên Bình',
    region: 25000,
    x: 1214.74,
    z: -33.169998,
    y: 1138.78,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Trung hoa - Giáng Thiên Bình',
    region: 26265,
    x: 818.46002,
    z: -106.77,
    y: 1749.24,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Trung hoa - Giáng Thiên Bình',
    region: 23687,
    x: 1678.6,
    z: 255.45,
    y: 386.95001,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Âu Châu - Shadi',
    region: 23687,
    x: 1678.66,
    z: 262.85001,
    y: 336.59,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Âu Châu - Shadi',
    region: 27499,
    x: 1616.26,
    z: 180.0,
    y: 223.77,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp dược liệu Âu Châu - Shadi',
    region: 26959,
    x: 504.87,
    z: 83.730003,
    y: 1086.59,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp hàng hóa Samarkand - Julia',
    region: 27499,
    x: 1636.65,
    z: 180.0,
    y: 282.54999,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp hàng hóa Trung Hoa - Hướng Nhật',
    region: 25000,
    x: 1230.96,
    z: -33.09,
    y: 1119.78,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp hàng hóa Âu Châu - Ohara',
    region: 26959,
    x: 486.95999,
    z: 83.129997,
    y: 1042.9301,
    teleport: [],
  },
  {
    name: 'Nhà cung cấp hàng hóa Đôn Hoàng - Lý Hằng',
    region: 26265,
    x: 786.70001,
    z: -106.77,
    y: 1776.36,
    teleport: [],
  },
  {
    name: 'Nhà thám hiểm Demetri',
    region: 26959,
    x: 1354.66,
    z: 80.0,
    y: 580.23999,
    teleport: [],
  },
  {
    name: 'Nhà Tiên Tri Cổ Đại',
    region: 23687,
    x: 1227.34,
    z: 243.96001,
    y: 12.34,
    teleport: [
      {
        name: 'GATE_OTHER_SKYTEMPLE_C',
        region: 23007,
        x: 1301,
        z: 50,
        y: 1307,
      },
    ],
  },
  {
    name: 'Nhân viên hỗ trợ tiền đồn Gemma',
    region: 25956,
    x: 555.23999,
    z: 180.0,
    y: 261.78,
    teleport: [],
  },
  {
    name: 'Nhân viên hỗ trợ tiền đồn Lily',
    region: 27717,
    x: 1094.8,
    z: -81.720001,
    y: 1389.1801,
    teleport: [],
  },
  {
    name: 'Nhân viên hỗ trợ tiền đồn Masha',
    region: 26229,
    x: 506.82999,
    z: 194.62,
    y: 1732.54,
    teleport: [],
  },
  {
    name: 'Nhân viên hỗ trợ tiền đồn Roxy',
    region: 26478,
    x: 222.10001,
    z: 174.11,
    y: 472.39999,
    teleport: [],
  },
  {
    name: 'Như Tiên Cổ Lệ - Chủ hàng tạp hóa',
    region: 26265,
    x: 559.19,
    z: -104.28,
    y: 737.88,
    teleport: [],
  },
  {
    name: 'Nuur - Quản lý các hội',
    region: 22107,
    x: 25.6,
    z: -433.28,
    y: 1728.99,
    teleport: [],
  },
  {
    name: 'Nữ hoàng Sheherazade',
    region: 22618,
    x: 1366.6,
    z: -236.59,
    y: 129.67,
    teleport: [],
  },
  {
    name: 'Osaman -Thương gia buôn hàng đặc biệt',
    region: 23411,
    x: 377.14999,
    z: 2628.78,
    y: 104.86,
    teleport: [],
  },
  {
    name: 'Paje - Binh lính',
    region: 27500,
    x: 1827.9399,
    z: 180.0,
    y: 35.459999,
    teleport: [],
  },
  {
    name: 'Phong Hồn Tặc',
    region: 24758,
    x: 635.94,
    z: 19.360001,
    y: 397.26001,
    teleport: [],
  },
  {
    name: 'Phá Nhĩ Yên -Thương gia buôn hàng đặc biệt',
    region: 26753,
    x: 131.41,
    z: 113.1,
    y: 1404.95,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn  Fu Jiu Lan',
    region: 23972,
    x: 981.37,
    z: 568.90002,
    y: 543.84003,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn  Shan Qing',
    region: 24221,
    x: 135.75,
    z: 394.89001,
    y: 468.95999,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn  Zhi Dao',
    region: 24490,
    x: 665.90002,
    z: 23.709999,
    y: 528.77002,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Aoman',
    region: 23435,
    x: 1340.98,
    z: 16.440001,
    y: 1216.36,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Baba',
    region: 26478,
    x: 212.31,
    z: 178.92,
    y: 521.02002,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Chao Leung',
    region: 22653,
    x: 251.02,
    z: 861.64001,
    y: 734.28998,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Cindy',
    region: 27983,
    x: 106.27,
    z: 164.25,
    y: 1064.77,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Daniel',
    region: 27717,
    x: 1084.3199,
    z: -96.650002,
    y: 1426.36,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Doris',
    region: 26229,
    x: 589.13,
    z: 192.17,
    y: 1709.84,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Edan',
    region: 25491,
    x: 1688.52,
    z: 41.209999,
    y: 590.69,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Fa Wu',
    region: 25244,
    x: 407.32001,
    z: 75.800003,
    y: 1607.75,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Han Bi',
    region: 24469,
    x: 1119.38,
    z: 30.93,
    y: 1771.77,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Mahap',
    region: 25223,
    x: 1307.11,
    z: 114.38,
    y: 1694.67,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Rachel',
    region: 25930,
    x: 1148.62,
    z: -3.96,
    y: 1104.5,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Shima',
    region: 23682,
    x: 1607.51,
    z: 615.04999,
    y: 1560.54,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Vanessa',
    region: 26977,
    x: 813.65002,
    z: 180.0,
    y: 618.22998,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Xiao Hu',
    region: 26260,
    x: 487.22,
    z: 43.490002,
    y: 1819.12,
    teleport: [],
  },
  {
    name: 'Phó đội trưởng tiền đồn Xiao Jun',
    region: 26267,
    x: 1131.4,
    z: -99.809998,
    y: 1363.0699,
    teleport: [],
  },
  {
    name: 'Phù thuỷ Mohammed',
    region: 22354,
    x: 667.81,
    z: 299.85999,
    y: 39.689999,
    teleport: [],
  },
  {
    name: 'Phù thủy Sunset',
    region: 27728,
    x: 1835.89,
    z: 743.89001,
    y: 1588.89,
    teleport: [],
  },
  {
    name: 'Phùng Huyên - Binh lính',
    region: 25000,
    x: 937.54999,
    z: 0.0,
    y: 1902.71,
    teleport: [],
  },
  {
    name: 'Phổ Lạc La - Nhà thám hiểm',
    region: 25000,
    x: 1670.79,
    z: 11.0,
    y: 260.54001,
    teleport: [],
  },
  {
    name: 'Poy - Người bán vé',
    region: 22137,
    x: 851.51001,
    z: 2064.4299,
    y: 1033.4399,
    teleport: [
      {
        name: 'Người bán vé thuyền bay Ajati',
        region: 24438,
        x: 888,
        z: 2523,
        y: 538,
      },
      {
        name: 'Người bán vé thuyền bay Sayun',
        region: 22390,
        x: 909,
        z: 2516,
        y: 267,
      },
    ],
  },
  {
    name: 'Quách Uy - Trưởng tiêu cục',
    region: 25255,
    x: 1600.3101,
    z: 0.0,
    y: 400.38,
    teleport: [],
  },
  {
    name: 'Quản kho Abdullah',
    region: 22106,
    x: 1488.6,
    z: -433.28,
    y: 1682.8101,
    teleport: [],
  },
  {
    name: 'Quản lý nhiệm vụ hàng ngày - Asshur',
    region: 26959,
    x: 897.96002,
    z: 83.739998,
    y: 721.15997,
    teleport: [],
  },
  {
    name: 'Quản lý nhiệm vụ hàng ngày - Bai Man',
    region: 26265,
    x: 1138.34,
    z: -106.74,
    y: 1775.12,
    teleport: [],
  },
  {
    name: 'Quản lý nhiệm vụ hàng ngày - Dasra',
    region: 23687,
    x: 1674.91,
    z: 248.42,
    y: 559.34003,
    teleport: [],
  },
  {
    name: 'Quản lý nhiệm vụ hàng ngày - Senlaf',
    region: 27500,
    x: 239.17999,
    z: 180.0,
    y: 339.64001,
    teleport: [],
  },
  {
    name: 'Quản lý nhiệm vụ hàng ngày - Wei Yan',
    region: 25000,
    x: 716.98999,
    z: -33.169998,
    y: 1107.1899,
    teleport: [],
  },
  {
    name: 'Quản lý pháo đài Hòa Điền',
    region: 15173,
    x: 679.09998,
    z: 84.970001,
    y: 165.75999,
    teleport: [],
  },
  {
    name: 'Quản lý pháo đài Sơn Tặc Trại',
    region: 17487,
    x: 557.71002,
    z: 1381.08,
    y: 1723.99,
    teleport: [],
  },
  {
    name: 'Quản lý pháo đài Trường An',
    region: 17990,
    x: 890.13,
    z: 67.0,
    y: 1337.29,
    teleport: [],
  },
  {
    name: 'Quản lý pháo đài Đông Âu',
    region: 15709,
    x: 410.73001,
    z: 0.0,
    y: 1901.24,
    teleport: [],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.17999,
    z: 628.23999,
    y: 1108.41,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.33002,
    z: 628.66998,
    y: 1108.21,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.42999,
    z: 628.64001,
    y: 1108.46,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.33002,
    z: 628.71002,
    y: 1108.61,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.15002,
    z: 628.0,
    y: 1108.13,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.41998,
    z: 628.0,
    y: 1108.9301,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.66998,
    z: 628.81,
    y: 1108.28,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý phụ bản',
    region: 27091,
    x: 779.98999,
    z: 628.25,
    y: 1107.9399,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Quản lý trang trại Jyamilrun',
    region: 22869,
    x: 1851.5601,
    z: 0.0,
    y: 1262.84,
    teleport: [],
  },
  {
    name: 'Quản lý vật phẩm đấu trường',
    region: 23687,
    x: 1241.35,
    z: 245.42999,
    y: 469.28,
    teleport: [],
  },
  {
    name: 'Quản lý đấu trường',
    region: 25000,
    x: 857.58002,
    z: -32.580002,
    y: 853.56,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Quản lý đấu trường',
    region: 23687,
    x: 1242.4,
    z: 245.95,
    y: 507.35001,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Quản lý đấu trường',
    region: 26265,
    x: 932.44,
    z: -106.76,
    y: 1704.04,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Quản lý đấu trường',
    region: 26959,
    x: 431.73999,
    z: 83.739998,
    y: 892.15997,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Quản lý đấu trường',
    region: 27500,
    x: 346.60001,
    z: 180.0,
    y: 50.77,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Quản lý đấu trường',
    region: 23088,
    x: 780.54999,
    z: 862.0,
    y: 945.59003,
    teleport: [
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
      { name: 'Quản lý phụ bản', region: 27091, x: 800, z: 800, y: 950 },
    ],
  },
  {
    name: 'Raffy - Hướng dẫn viên',
    region: 26957,
    x: 1650.2,
    z: 83.870003,
    y: 1332.48,
    teleport: [
      {
        name: 'Lipria - Hướng dẫn viên',
        region: 27471,
        x: 1321,
        z: 82,
        y: 422,
      },
      { name: 'Riise - Hướng dẫn viên', region: 26959, x: 542, z: 83, y: 1147 },
    ],
  },
  {
    name: 'Raul - Kẻ buôn lậu',
    region: 26957,
    x: 1674.33,
    z: 80.0,
    y: 468.89001,
    teleport: [],
  },
  {
    name: 'Renenutet - Bác Sỹ',
    region: 22831,
    x: 1716.37,
    z: 949.82001,
    y: 1903.42,
    teleport: [],
  },
  {
    name: 'Rialto - Quan chấp chính',
    region: 27214,
    x: 807.88,
    z: 98.190002,
    y: 994.69,
    teleport: [],
  },
  {
    name: 'Riedo - Binh lính',
    region: 27471,
    x: 1145.46,
    z: 80.0,
    y: 556.90002,
    teleport: [],
  },
  {
    name: 'Riise - Hướng dẫn viên',
    region: 26959,
    x: 562.85999,
    z: 83.629997,
    y: 1138.58,
    teleport: [
      {
        name: 'Lipria - Hướng dẫn viên',
        region: 27471,
        x: 1321,
        z: 82,
        y: 422,
      },
      {
        name: 'Raffy - Hướng dẫn viên',
        region: 26957,
        x: 1609,
        z: 80,
        y: 1381,
      },
    ],
  },
  {
    name: 'Road - Kẻ buôn lậu',
    region: 23498,
    x: 60.82,
    z: -216.2,
    y: 1765.33,
    teleport: [],
  },
  {
    name: 'Sa Lí Cáp - Người buôn ngựa',
    region: 23431,
    x: 1540.88,
    z: 249.81,
    y: 1873.05,
    teleport: [],
  },
  {
    name: 'Sa Lý Hãn - Người dân trong thôn',
    region: 22125,
    x: 616.32001,
    z: 2584.9299,
    y: 698.73999,
    teleport: [],
  },
  {
    name: 'Saalhap - Người quản lý đường hầm',
    region: 26232,
    x: 1489.76,
    z: 185.39,
    y: 1842.9399,
    teleport: [
      {
        name: 'Người dẫn đường Maryokuk',
        region: 25469,
        x: 376,
        z: 244,
        y: 486,
      },
    ],
  },
  {
    name: 'Saena - Người bán vé phi thuyền',
    region: 25975,
    x: 1368.73,
    z: 324.81,
    y: 1335.88,
    teleport: [
      {
        name: 'Người bán vé thuyền bay Ajati',
        region: 24438,
        x: 888,
        z: 2523,
        y: 538,
      },
      { name: 'Bến bắc Karakolam', region: 23929, x: 862, z: 2105, y: 1623 },
    ],
  },
  {
    name: 'Saesa - Quản kho',
    region: 27244,
    x: 563.42999,
    z: 180.0,
    y: 1131.66,
    teleport: [],
  },
  {
    name: 'Saha - Buôn hàng tạp hoá',
    region: 27243,
    x: 1644.8101,
    z: 180.0,
    y: 1460.36,
    teleport: [],
  },
  {
    name: 'Sailor 1 - Lính Ai Cập',
    region: 24112,
    x: 1455.1801,
    z: 535.78003,
    y: 155.39999,
    teleport: [],
  },
  {
    name: 'Sailor 1 - Lính Ai Cập',
    region: 24111,
    x: 1858.0601,
    z: 537.40997,
    y: 236.42999,
    teleport: [],
  },
  {
    name: 'Sailor 2 - Lính Ai Cập',
    region: 24112,
    x: 1689.52,
    z: 519.32001,
    y: 157.02,
    teleport: [],
  },
  {
    name: 'Sailor 2 - Lính Ai Cập',
    region: 24111,
    x: 1470.21,
    z: 545.0,
    y: 563.01001,
    teleport: [],
  },
  {
    name: 'Sailor 2 - Lính Ai Cập',
    region: 23857,
    x: 704.78998,
    z: 551.90002,
    y: 544.53998,
    teleport: [],
  },
  {
    name: 'Sama - Người bán vé đò',
    region: 23439,
    x: 323.35999,
    z: 17.889999,
    y: 1747.85,
    teleport: [
      {
        name: 'La Hán - Người bán vé đò',
        region: 23436,
        x: 904,
        z: -23,
        y: 1412,
      },
    ],
  },
  {
    name: 'San San - Quản kho',
    region: 25000,
    x: 980.34998,
    z: -32.52,
    y: 989.19,
    teleport: [],
  },
  {
    name: 'Sandick - Thương gia',
    region: 23687,
    x: 1515.55,
    z: 243.99001,
    y: 904.54999,
    teleport: [],
  },
  {
    name: 'Seek - Kẻ buôn lậu',
    region: 23603,
    x: 232.57001,
    z: 1539.47,
    y: 659.76001,
    teleport: [],
  },
  {
    name: 'Senmute - Thống đốc Ai Cập',
    region: 23343,
    x: 1344.36,
    z: 978.45001,
    y: 377.82001,
    teleport: [],
  },
  {
    name: 'Sennefer - Quản lý các hội',
    region: 23344,
    x: 643.77002,
    z: 930.0,
    y: 1471.98,
    teleport: [],
  },
  {
    name: 'Sesilrum - Người bảo vệ Cung Điện',
    region: 23343,
    x: 1546.88,
    z: 963.0,
    y: 281.07999,
    teleport: [],
  },
  {
    name: 'Shahad - Trưởng tiêu cục',
    region: 27500,
    x: 405.87,
    z: 180.0,
    y: 1282.9301,
    teleport: [],
  },
  {
    name: 'Shard - Người bán vé thuyền bay',
    region: 24934,
    x: 1503.91,
    z: 626.54999,
    y: 70.900002,
    teleport: [
      {
        name: 'Người bán vé thuyền bay Sangnia',
        region: 24424,
        x: 1902,
        z: 3854,
        y: 657,
      },
    ],
  },
  {
    name: 'Sharon - Thương nhân buôn giáp',
    region: 23087,
    x: 1731.92,
    z: 863.31,
    y: 875.04999,
    teleport: [],
  },
  {
    name: 'Sikeulro - Chủ quán trọ',
    region: 26959,
    x: 1348.9,
    z: 80.0,
    y: 845.88,
    teleport: [],
  },
  {
    name: 'Snefru - Người gác hải đăng',
    region: 24112,
    x: 286.72,
    z: 584.73999,
    y: 470.60999,
    teleport: [],
  },
  {
    name: 'Sơn tặc Hổ Huyệt Sơn',
    region: 24758,
    x: 1137.6,
    z: -27.34,
    y: 887.90997,
    teleport: [],
  },
  {
    name: 'Takia - Binh lính',
    region: 26957,
    x: 1311.34,
    z: 78.959999,
    y: 1548.86,
    teleport: [],
  },
  {
    name: 'Tana - Trưởng hội thương nhân',
    region: 26959,
    x: 165.07001,
    z: 85.489998,
    y: 173.33,
    teleport: [],
  },
  {
    name: 'Tapai - Binh lính',
    region: 27244,
    x: 75.919998,
    z: 180.0,
    y: 218.67999,
    teleport: [],
  },
  {
    name: 'Tausert - Chủ liên minh đạo tặc',
    region: 23347,
    x: 361.16,
    z: 1461.6,
    y: 1849.8,
    teleport: [],
  },
  {
    name: 'Thiara - Thương nhân buôn dược liệu',
    region: 23602,
    x: 829.46997,
    z: 1407.65,
    y: 346.16,
    teleport: [],
  },
  {
    name: 'Thiết bị bí ẩn',
    region: 22864,
    x: 302.45999,
    z: -3.9200001,
    y: 456.23999,
    teleport: [],
  },
  {
    name: 'Thiết bị bí ẩn',
    region: 22607,
    x: 693.19,
    z: -2.3299999,
    y: 173.64999,
    teleport: [],
  },
  {
    name: 'Thiết bị bí ẩn',
    region: 22094,
    x: 1745.87,
    z: 74.120003,
    y: 1531.4,
    teleport: [],
  },
  {
    name: 'Thiết bị bí ẩn',
    region: 21838,
    x: 97.540001,
    z: -73.93,
    y: 1429.34,
    teleport: [],
  },
  {
    name: 'Thiết Huyền - Thợ rèn',
    region: 25000,
    x: 332.73001,
    z: 0.0,
    y: 1406.7,
    teleport: [],
  },
  {
    name: 'Thác Hồ Đề - Binh lính',
    region: 23943,
    x: 1091.5601,
    z: 145.32001,
    y: 1607.77,
    teleport: [],
  },
  {
    name: 'Thác Man - Binh lính',
    region: 26521,
    x: 120.42,
    z: -106.96,
    y: 0.62,
    teleport: [],
  },
  {
    name: 'Tháp Tây - Người bán vé đò',
    region: 25761,
    x: 513.15997,
    z: 89.610001,
    y: 1281.35,
    teleport: [
      {
        name: 'Đào Chí - Người bán vé đò',
        region: 24993,
        x: 560,
        z: 140,
        y: 1460,
      },
    ],
  },
  {
    name: 'Thôi Bình - Binh lính',
    region: 25000,
    x: 1009.54,
    z: 0.0,
    y: 1902.64,
    teleport: [
      {
        name: 'Thượng Quan Nam - Binh lính',
        region: 25001,
        x: 1340,
        z: 0,
        y: 1817,
      },
      { name: 'Trần Kiên - Binh lính', region: 25000, x: 983, z: 0, y: 77 },
      { name: 'Hồ Khang - Binh lính', region: 24999, x: 386, z: 0, y: 1900 },
    ],
  },
  {
    name: 'Thư ký pháo đài Hòa Điền',
    region: 24199,
    x: 154.38,
    z: 151.53,
    y: 811.03998,
    teleport: [],
  },
  {
    name: 'Thư ký pháo đài Trường An',
    region: 25256,
    x: 1569.34,
    z: 69.82,
    y: 1115.21,
    teleport: [],
  },
  {
    name: 'Thư ký pháo đài Đông Âu',
    region: 27214,
    x: 1663.4399,
    z: 80.0,
    y: 1050.1899,
    teleport: [],
  },
  {
    name: 'Thương gia Dầu mỏ Khaled',
    region: 22361,
    x: 454.79999,
    z: -432.26001,
    y: 1242.6,
    teleport: [],
  },
  {
    name: 'Thương gia Trung Hoa - Quân Chiến Thiên',
    region: 23687,
    x: 1805.97,
    z: 254.17,
    y: 134.58,
    teleport: [],
  },
  {
    name: 'Thương gia Trung Hoa - Quân Mạc Tà',
    region: 25000,
    x: 1248.85,
    z: -33.0,
    y: 1102.79,
    teleport: [],
  },
  {
    name: 'Thương gia Trung Hoa - Quân Vô Y',
    region: 26265,
    x: 766.34003,
    z: -106.77,
    y: 1809.24,
    teleport: [],
  },
  {
    name: 'Thương gia Âu Châu - David',
    region: 23687,
    x: 1776.04,
    z: 253.99001,
    y: 162.97,
    teleport: [],
  },
  {
    name: 'Thương gia Âu Châu - Sid',
    region: 27499,
    x: 1654.5601,
    z: 180.0,
    y: 311.48999,
    teleport: [],
  },
  {
    name: 'Thương gia Âu Châu - Zephyd',
    region: 26959,
    x: 465.91,
    z: 83.269997,
    y: 1015.56,
    teleport: [],
  },
  {
    name: 'Thương nhân Alice',
    region: 23498,
    x: 393.62,
    z: -207.61,
    y: 1752.47,
    teleport: [],
  },
  {
    name: 'Thương nhân Anya',
    region: 26958,
    x: 1779.5601,
    z: 83.870003,
    y: 1279.52,
    teleport: [],
  },
  {
    name: 'Thương nhân Chabonne',
    region: 23687,
    x: 1486.86,
    z: 243.81,
    y: 10.69,
    teleport: [],
  },
  {
    name: 'Thương nhân Dena',
    region: 23088,
    x: 419.28,
    z: 863.31,
    y: 243.46001,
    teleport: [],
  },
  {
    name: 'Thương nhân Gia vị Malak',
    region: 22361,
    x: 722.21002,
    z: -431.98999,
    y: 1464.3199,
    teleport: [],
  },
  {
    name: 'Thương nhân Hoa quả Syukri',
    region: 22361,
    x: 721.41998,
    z: -432.13,
    y: 449.79999,
    teleport: [],
  },
  {
    name: 'Thương nhân Samantha',
    region: 27243,
    x: 1475.9,
    z: 180.0,
    y: 1661.35,
    teleport: [],
  },
  {
    name: 'Thương nhân Shan Hua',
    region: 26265,
    x: 580.46002,
    z: -104.54,
    y: 387.51999,
    teleport: [],
  },
  {
    name: 'Thượng Quan Nam - Binh lính',
    region: 25001,
    x: 1387.17,
    z: -0.07,
    y: 1765.02,
    teleport: [
      { name: 'Thôi Bình - Binh lính', region: 25000, x: 976, z: -6, y: 1834 },
      { name: 'Trần Kiên - Binh lính', region: 25000, x: 983, z: 0, y: 77 },
      { name: 'Hồ Khang - Binh lính', region: 24999, x: 386, z: 0, y: 1900 },
    ],
  },
  {
    name: 'Thần Đèn',
    region: 25000,
    x: 895.5,
    z: -29.17,
    y: 758.59998,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 26265,
    x: 877.78998,
    z: -106.77,
    y: 1528.75,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 23687,
    x: 1218.64,
    z: 243.44,
    y: 420.95001,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 26959,
    x: 821.44,
    z: 83.739998,
    y: 645.06,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 27244,
    x: 123.49,
    z: 180.0,
    y: 1678.22,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 23088,
    x: 856.26001,
    z: 863.35999,
    y: 1074.41,
    teleport: [],
  },
  {
    name: 'Thần Đèn',
    region: 22106,
    x: 1315.84,
    z: -433.28,
    y: 1491.88,
    teleport: [],
  },
  {
    name: 'Thợ rèn Hòa Điền',
    region: 14917,
    x: 906.71002,
    z: 84.620003,
    y: 1859.38,
    teleport: [],
  },
  {
    name: 'Thợ rèn Sơn Tặc Trại',
    region: 17487,
    x: 257.14999,
    z: 1381.16,
    y: 1690.73,
    teleport: [],
  },
  {
    name: 'Thợ rèn Trường An',
    region: 17990,
    x: 615.79999,
    z: 40.0,
    y: 1083.84,
    teleport: [],
  },
  {
    name: 'Thợ rèn Đông Âu',
    region: 15709,
    x: 800.64001,
    z: 0.0,
    y: 1888.6,
    teleport: [],
  },
  {
    name: 'Thợ sửa chữa Uthman',
    region: 22874,
    x: 1594.33,
    z: -430.84,
    y: 1290.55,
    teleport: [],
  },
  {
    name: 'Titi - Thương nhân buôn dược liệu',
    region: 23088,
    x: 797.03003,
    z: 863.28003,
    y: 262.79999,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc - Ca Nữ',
    region: 24999,
    x: 901.51001,
    z: 16.190001,
    y: 621.17999,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 26959,
    x: 843.84998,
    z: 83.739998,
    y: 1138.0,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 25000,
    x: 1101.6801,
    z: -32.279999,
    y: 854.29999,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 23687,
    x: 1130.4,
    z: 245.02,
    y: 370.64001,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 26265,
    x: 932.34003,
    z: -106.76,
    y: 1569.58,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 27244,
    x: 52.139999,
    z: 180.0,
    y: 1681.3199,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 23088,
    x: 449.84,
    z: 862.0,
    y: 1269.51,
    teleport: [],
  },
  {
    name: 'Tiểu Ngọc hoạt bát',
    region: 22106,
    x: 1499.51,
    z: -432.39001,
    y: 1425.5699,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 25000,
    x: 1065.2,
    z: 11.61,
    y: 772.31,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 26265,
    x: 685.19,
    z: -106.78,
    y: 1462.54,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 23687,
    x: 1045.1801,
    z: 243.0,
    y: 407.25,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 26959,
    x: 693.48999,
    z: 83.739998,
    y: 641.67999,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 23088,
    x: 454.59,
    z: 863.34003,
    y: 929.0,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 27244,
    x: 90.389999,
    z: 180.0,
    y: 1680.98,
    teleport: [],
  },
  {
    name: 'Tiểu Phàm - Người quản lý dịch vụ',
    region: 22106,
    x: 1451.8,
    z: -432.5,
    y: 1441.9301,
    teleport: [],
  },
  {
    name: 'Tiểu Thất - Ăn mày',
    region: 24999,
    x: 1386.09,
    z: 16.74,
    y: 543.72998,
    teleport: [],
  },
  {
    name: 'Topni - Người quản lý đường hầm',
    region: 27000,
    x: 1195.11,
    z: 598.15002,
    y: 1826.79,
    teleport: [
      { name: 'Người dẫn đường Asui', region: 26237, x: 362, z: 393, y: 599 },
    ],
  },
  {
    name: 'Toson - Thương gia',
    region: 27244,
    x: 837.14001,
    z: 180.0,
    y: 1823.25,
    teleport: [],
  },
  {
    name: 'Treno - Lái buôn ngựa',
    region: 26958,
    x: 1794.5,
    z: 83.870003,
    y: 366.17999,
    teleport: [],
  },
  {
    name: 'Tricia - Thương nhân buôn vũ khí',
    region: 27499,
    x: 1762.61,
    z: 180.0,
    y: 809.78003,
    teleport: [],
  },
  {
    name: 'Triệu Kình Thảo - Binh lính',
    region: 24999,
    x: 334.39999,
    z: -1.28,
    y: 1849.16,
    teleport: [],
  },
  {
    name: 'Triệu Đại Sơn - Thương gia',
    region: 25000,
    x: 1760.3199,
    z: 11.0,
    y: 480.22,
    teleport: [],
  },
  {
    name: 'Trung tá mất tích Dustun',
    region: -32746,
    x: -225.36,
    z: 1.59,
    y: -1572.11,
    teleport: [],
  },
  {
    name: 'Trác Bộ Lỗ - Nô lệ',
    region: 23918,
    x: 770.06,
    z: 3814.8799,
    y: 384.17999,
    teleport: [],
  },
  {
    name: 'Trân Trân - Chủ hàng tạp hóa',
    region: 25000,
    x: 1658.55,
    z: 0.0,
    y: 1078.1899,
    teleport: [],
  },
  {
    name: 'Trùm băng cướp',
    region: 24758,
    x: 982.67999,
    z: 17.85,
    y: 557.08002,
    teleport: [],
  },
  {
    name: 'Trương Phu Nhân - Buôn giáp',
    region: 25000,
    x: 332.17001,
    z: 0.0,
    y: 1085.23,
    teleport: [],
  },
  {
    name: 'Trưởng lão Hoàng Lão Đầu',
    region: 25001,
    x: 850.02002,
    z: 0.0,
    y: 1433.16,
    teleport: [],
  },
  {
    name: 'Trưởng Tiêu cục Sami',
    region: 22874,
    x: 841.98999,
    z: -430.70999,
    y: 565.71997,
    teleport: [],
  },
  {
    name: 'Trưởng điều tra viên mất tích Aaliyah',
    region: 32237,
    x: 147.0,
    z: 856.0,
    y: 1082.6801,
    teleport: [],
  },
  {
    name: 'Trần Kiên - Binh lính',
    region: 25000,
    x: 930.07001,
    z: -0.41,
    y: 30.66,
    teleport: [
      { name: 'Thôi Bình - Binh lính', region: 25000, x: 976, z: -6, y: 1834 },
      {
        name: 'Thượng Quan Nam - Binh lính',
        region: 25001,
        x: 1340,
        z: 0,
        y: 1817,
      },
      { name: 'Hồ Khang - Binh lính', region: 24999, x: 386, z: 0, y: 1900 },
    ],
  },
  {
    name: 'Trợ lý trận đấu Hoà Điền',
    region: 15173,
    x: 591.48999,
    z: 84.199997,
    y: 70.360001,
    teleport: [],
  },
  {
    name: 'Trợ lý trận đấu pháo đài Đông Âu',
    region: 15709,
    x: 541.40002,
    z: 0.0,
    y: 1902.3,
    teleport: [],
  },
  {
    name: 'Trợ lý trận đấu Sơn Tặc Trại',
    region: 17487,
    x: 452.53,
    z: 1381.09,
    y: 1724.6801,
    teleport: [],
  },
  {
    name: 'Trợ lý trận đấu Trường An',
    region: 17990,
    x: 1404.92,
    z: 69.0,
    y: 1324.96,
    teleport: [],
  },
  {
    name: 'Tu nữ Martel',
    region: 27243,
    x: 1426.0699,
    z: 180.0,
    y: 1851.0,
    teleport: [],
  },
  {
    name: 'Tu nữ Retaldi',
    region: 26959,
    x: 1338.79,
    z: 84.089996,
    y: 1400.89,
    teleport: [],
  },
  {
    name: 'Turian - Lính Ai Cập',
    region: 22833,
    x: 471.22,
    z: 791.89001,
    y: 1001.9,
    teleport: [],
  },
  {
    name: 'Tây Bộc -Thương gia buôn hàng đặc biệt',
    region: 23712,
    x: 411.03,
    z: 1383.3199,
    y: 1515.89,
    teleport: [],
  },
  {
    name: 'Tô Phổ Nhĩ - Thợ rèn',
    region: 23687,
    x: 501.57999,
    z: 243.58,
    y: 766.27002,
    teleport: [],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 25000,
    x: 1068.62,
    z: -0.38999999,
    y: 953.67999,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 26265,
    x: 1059.13,
    z: -106.75,
    y: 1712.05,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 26959,
    x: 706.01001,
    z: 107.74,
    y: 1146.55,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 23687,
    x: 1062.16,
    z: 295.23999,
    y: 582.65997,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 27244,
    x: 285.29001,
    z: 180.0,
    y: 1846.4,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 23088,
    x: 541.39001,
    z: 863.35999,
    y: 880.56,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư tế bí ẩn',
    region: 22106,
    x: 1691.29,
    z: -433.28,
    y: 1628.78,
    teleport: [
      {
        name: 'Căn phòng bí mật bị phong ấn',
        region: -32742,
        x: 958,
        z: -134,
        y: 1213,
      },
    ],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 25000,
    x: 977.28003,
    z: -32.619999,
    y: 727.63,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 26959,
    x: 979.03998,
    z: 83.739998,
    y: 888.53998,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 23687,
    x: 1002.84,
    z: 243.98,
    y: 489.59,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 27244,
    x: 586.65002,
    z: 180.0,
    y: 1414.74,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 26265,
    x: 1162.7,
    z: -106.7,
    y: 1385.8101,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 23088,
    x: 786.20001,
    z: 863.35999,
    y: 1262.53,
    teleport: [],
  },
  {
    name: 'Tư vấn viên Gacha',
    region: 22106,
    x: 1704.5699,
    z: -432.39001,
    y: 1421.5,
    teleport: [],
  },
  {
    name: 'Tướng quân Ratchel',
    region: 26702,
    x: 1140.54,
    z: 83.870003,
    y: 1638.6899,
    teleport: [],
  },
  {
    name: 'Tướng quân Tôn Huyền',
    region: 25255,
    x: 588.04999,
    z: 0.0,
    y: 299.92001,
    teleport: [],
  },
  {
    name: 'Tướng về hưu Hasim',
    region: 25480,
    x: 1776.66,
    z: 102.2,
    y: 1143.63,
    teleport: [
      { name: 'Sa mạc chiều', region: 24300, x: 1400, z: 300, y: 484 },
    ],
  },
  {
    name: 'Vesaros - Lính gác',
    region: 26959,
    x: 29.459999,
    z: 80.0,
    y: 1675.27,
    teleport: [],
  },
  {
    name: 'Viviana - Thương nhân buôn giáp',
    region: 23602,
    x: 639.19,
    z: 1364.63,
    y: 87.459999,
    teleport: [],
  },
  {
    name: 'Vua Shahryar',
    region: 22618,
    x: 1317.95,
    z: -236.59,
    y: 274.88,
    teleport: [],
  },
  {
    name: 'Vô Địch Phi Tặc',
    region: 24758,
    x: 1424.28,
    z: 9.9300003,
    y: 1376.74,
    teleport: [],
  },
  {
    name: 'Vương Ngưu - Quản kho',
    region: 25000,
    x: 980.79999,
    z: -32.43,
    y: 989.13,
    teleport: [],
  },
  {
    name: 'Vương Đại Nguyên -Bán vé số',
    region: 25001,
    x: 225.84,
    z: -35.98,
    y: 911.37,
    teleport: [],
  },
  {
    name: 'Vợ người nông dân Hadijya',
    region: 22357,
    x: 1802.25,
    z: -5.0000001e-2,
    y: 1243.5,
    teleport: [],
  },
  {
    name: 'Warda - Chủ hàng tạp hóa',
    region: 22617,
    x: 1027.54,
    z: -431.29999,
    y: 950.45001,
    teleport: [],
  },
  {
    name: 'Wasdi - Thương gia',
    region: 23344,
    x: 1112.25,
    z: 930.13,
    y: 1919.4,
    teleport: [],
  },
  {
    name: 'Xiao - Kẻ buôn lậu',
    region: 24999,
    x: 1388.75,
    z: 0.60000002,
    y: 1291.9399,
    teleport: [],
  },
  {
    name: 'Xảo Vân - Người bán vé',
    region: 25001,
    x: 183.8,
    z: -35.990002,
    y: 913.08002,
    teleport: [],
  },
  {
    name: 'Y Ly Na - Quản kho',
    region: 26265,
    x: 1260.35,
    z: -105.81,
    y: 696.90002,
    teleport: [],
  },
  {
    name: 'Yongso',
    region: 27728,
    x: 1681.53,
    z: 742.08002,
    y: 1483.9,
    teleport: [],
  },
  {
    name: 'Yupitel - Quản lý',
    region: 26958,
    x: 635.78998,
    z: 83.870003,
    y: 1213.05,
    teleport: [],
  },
  {
    name: 'Zhong Hu - Kẻ buôn lậu',
    region: 26265,
    x: 1595.45,
    z: -106.15,
    y: 869.58002,
    teleport: [],
  },
  {
    name: 'á Lực Khôn - Người bán vé',
    region: 23432,
    x: 950.03998,
    z: 13.65,
    y: 1270.3101,
    teleport: [],
  },
  {
    name: 'Ô Luân - Binh lính',
    region: 23686,
    x: 1072.95,
    z: 13.43,
    y: 523.54999,
    teleport: [],
  },
  {
    name: 'Điều tra viên Hoàng gia Ijadun',
    region: 20050,
    x: 280.91,
    z: -730.75,
    y: 1489.41,
    teleport: [],
  },
  {
    name: 'Điều tra viên Hoàng gia Maribatun',
    region: 20828,
    x: 843.28998,
    z: -195.52,
    y: 1513.1,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Almanu',
    region: 31980,
    x: 715.97998,
    z: 1116.0,
    y: 297.01001,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Avrill',
    region: 23498,
    x: 168.14999,
    z: -204.59,
    y: 1724.6,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Elda',
    region: 31723,
    x: 1440.9301,
    z: 856.0,
    y: 555.91998,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Kristen',
    region: 32236,
    x: 91.699997,
    z: 856.0,
    y: 1084.41,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Natal',
    region: 32236,
    x: 945.04999,
    z: 886.03998,
    y: 840.79999,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Rachel',
    region: 31981,
    x: 517.08002,
    z: 896.53998,
    y: 520.38,
    teleport: [],
  },
  {
    name: 'Điều tra viên mất tích Ruin',
    region: 31979,
    x: 1272.27,
    z: 896.29999,
    y: 527.52002,
    teleport: [],
  },
  {
    name: 'Đào Chí - Người bán vé đò',
    region: 24993,
    x: 362.29999,
    z: 72.480003,
    y: 1761.33,
    teleport: [
      {
        name: 'Tháp Tây - Người bán vé đò',
        region: 25761,
        x: 636,
        z: 160,
        y: 1482,
      },
    ],
  },
  {
    name: 'Đá biến hình Demon Shaitan',
    region: 27091,
    x: 1142.97,
    z: 382.01001,
    y: 1127.4301,
    teleport: [],
  },
  {
    name: 'Đá biến hình Demon Shaitan',
    region: 27091,
    x: 1142.23,
    z: 381.66,
    y: 1127.04,
    teleport: [],
  },
  {
    name: 'Đá biến hình Imhotep',
    region: 27091,
    x: 1142.42,
    z: 381.0,
    y: 810.39001,
    teleport: [],
  },
  {
    name: 'Đá biến hình Imhotep',
    region: 27091,
    x: 1142.3199,
    z: 381.60999,
    y: 810.84003,
    teleport: [],
  },
  {
    name: 'Đá biến hình Nephthys',
    region: 27091,
    x: 1142.0601,
    z: 381.0,
    y: 1127.21,
    teleport: [],
  },
  {
    name: 'Đá biến hình Nephthys',
    region: 27091,
    x: 1142.42,
    z: 381.76999,
    y: 1127.8,
    teleport: [],
  },
  {
    name: 'Đá biến hình Niya Shaman',
    region: 27091,
    x: 1141.88,
    z: 381.85999,
    y: 1127.92,
    teleport: [],
  },
  {
    name: 'Đá biến hình Niya Shaman',
    region: 27091,
    x: 1142.13,
    z: 381.53,
    y: 1127.47,
    teleport: [],
  },
  {
    name: 'Đá biến hình Seiren',
    region: 27091,
    x: 1142.17,
    z: 381.82001,
    y: 809.84998,
    teleport: [],
  },
  {
    name: 'Đá biến hình Seiren',
    region: 27091,
    x: 1142.8199,
    z: 381.67001,
    y: 810.04999,
    teleport: [],
  },
  {
    name: 'Đá biến hình Slave Watcher',
    region: 27091,
    x: 1141.88,
    z: 381.85999,
    y: 810.44,
    teleport: [],
  },
  {
    name: 'Đá biến hình Slave Watcher',
    region: 27091,
    x: 1142.77,
    z: 381.53,
    y: 810.98999,
    teleport: [],
  },
  {
    name: 'Đá biến hình Tomb Snake Lady',
    region: 27091,
    x: 1142.53,
    z: 381.26999,
    y: 810.32001,
    teleport: [],
  },
  {
    name: 'Đá biến hình Tomb Snake Lady',
    region: 27091,
    x: 1142.14,
    z: 381.0,
    y: 810.89001,
    teleport: [],
  },
  {
    name: 'Đá biến hình Yeoha',
    region: 27091,
    x: 1141.92,
    z: 382.16,
    y: 1127.97,
    teleport: [],
  },
  {
    name: 'Đá biến hình Yeoha',
    region: 27091,
    x: 1142.3199,
    z: 381.67001,
    y: 1127.0699,
    teleport: [],
  },
  {
    name: 'Đá dịch chuyển',
    region: -32742,
    x: 958.0,
    z: -136.49001,
    y: 1205.22,
    teleport: [],
  },
  {
    name: 'Đá dịch chuyển',
    region: -32741,
    x: 804.47998,
    z: -134.49001,
    y: 1251.49,
    teleport: [],
  },
  {
    name: 'Đá dịch chuyển',
    region: -32740,
    x: 778.81,
    z: -134.49001,
    y: 1243.24,
    teleport: [],
  },
  {
    name: 'Đá dịch chuyển',
    region: -32739,
    x: 256.064,
    z: 7.76648,
    y: -375.74899,
    teleport: [
      {
        name: 'GATE_ENTRANCE_TO_VENEFICA',
        region: 24470,
        x: 1774,
        z: -21,
        y: 1520,
      },
    ],
  },
  {
    name: 'Đá dịch chuyển',
    region: -32738,
    x: 260.17801,
    z: 7.76651,
    y: -364.73999,
    teleport: [
      {
        name: 'GATE_ENTRANCE_TO_VENEFICA',
        region: 24470,
        x: 1774,
        z: -21,
        y: 1520,
      },
    ],
  },
  {
    name: 'Đá phong ấn của Cerberus',
    region: -32742,
    x: 767.22998,
    z: -134.5,
    y: 1105.8199,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của chúa tể Yarkan',
    region: -32742,
    x: 1110.08,
    z: -134.5,
    y: 1185.48,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của Isyutaru',
    region: -32742,
    x: 830.51001,
    z: -134.5,
    y: 823.97998,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của Khulood',
    region: -32742,
    x: 1085.51,
    z: -134.5,
    y: 823.97998,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của Merikh',
    region: -32742,
    x: 1148.23,
    z: -134.5,
    y: 895.53003,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của quỷ Sa tăng',
    region: -32742,
    x: 1148.23,
    z: -134.5,
    y: 1105.8199,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của Tiếu Tiếu Hắc Xà',
    region: -32742,
    x: 1148.79,
    z: -134.5,
    y: 1005.48,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của Uruchi',
    region: -32742,
    x: 767.22998,
    z: -134.5,
    y: 895.53003,
    teleport: [],
  },
  {
    name: 'Đá phong ấn của đại úy Ivy',
    region: -32742,
    x: 766.78998,
    z: -134.5,
    y: 1005.48,
    teleport: [],
  },
  {
    name: 'Đô Luân Nhật - Binh lính',
    region: 23431,
    x: 1088.89,
    z: 13.29,
    y: 377.60999,
    teleport: [],
  },
  {
    name: 'Đường Diệu Minh - Binh lính',
    region: 25000,
    x: 1037.3,
    z: -0.44,
    y: 30.209999,
    teleport: [],
  },
  {
    name: 'Đại diện của Baal Diva',
    region: -32746,
    x: 1233.5,
    z: 1.59,
    y: 756.14001,
    teleport: [],
  },
  {
    name: 'Đại sư Huyền Trang',
    region: 26521,
    x: 1402.05,
    z: -79.75,
    y: 1258.65,
    teleport: [],
  },
  {
    name: 'Đại sư Pháp Hiền',
    region: 26521,
    x: 937.28998,
    z: -93.949997,
    y: 1791.27,
    teleport: [],
  },
  {
    name: 'Đại sư Pháp Không',
    region: 26521,
    x: 637.73999,
    z: -96.25,
    y: 1489.99,
    teleport: [],
  },
  {
    name: 'Đại thần Abshad',
    region: 22363,
    x: 1175.9399,
    z: -393.92001,
    y: 103.84,
    teleport: [],
  },
  {
    name: 'Đại thần Mahmud',
    region: 22363,
    x: 1611.5601,
    z: -412.73999,
    y: 532.56,
    teleport: [],
  },
  {
    name: 'Đồ Các - Binh lính',
    region: 26265,
    x: 120.79,
    z: -106.91,
    y: 1831.87,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Albert',
    region: 27983,
    x: 164.94,
    z: 163.16,
    y: 1065.35,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Amanda',
    region: 27717,
    x: 1118.86,
    z: -114.83,
    y: 1479.39,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Austin',
    region: 26977,
    x: 769.15002,
    z: 179.99001,
    y: 648.62,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Bai Qi Long',
    region: 26267,
    x: 1090.22,
    z: -97.360001,
    y: 1328.2,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Dao Zhi Fong',
    region: 26260,
    x: 504.73001,
    z: 30.18,
    y: 1880.8,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Dick',
    region: 25930,
    x: 1109.08,
    z: -6.0700002,
    y: 1078.67,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Ethan',
    region: 26229,
    x: 541.33002,
    z: 195.53,
    y: 1706.77,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Galia',
    region: 26202,
    x: 1608.95,
    z: 2.8099999,
    y: 1814.64,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Gavin',
    region: 26478,
    x: 160.10001,
    z: 181.41,
    y: 552.89001,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Guo Mu Hu',
    region: 25244,
    x: 394.95001,
    z: 72.370003,
    y: 1659.3199,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Haviel',
    region: 25956,
    x: 597.41998,
    z: 180.0,
    y: 338.47,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Hoa Hung',
    region: 23435,
    x: 1368.36,
    z: 12.07,
    y: 1264.38,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Hu Ru Lang',
    region: 23682,
    x: 1656.71,
    z: 610.32001,
    y: 1559.6801,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Mu Qi Yong',
    region: 22653,
    x: 317.57001,
    z: 857.5,
    y: 734.58002,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Mu Ri Lun',
    region: 24469,
    x: 1128.05,
    z: 62.130001,
    y: 1719.7,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Raman',
    region: 25491,
    x: 1719.86,
    z: 38.849998,
    y: 657.54999,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Ru Long Hu',
    region: 25223,
    x: 1309.21,
    z: 115.4,
    y: 1752.95,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Tan Wei',
    region: 24221,
    x: 158.61,
    z: 394.45001,
    y: 532.54999,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Tsai Bao',
    region: 23972,
    x: 978.53003,
    z: 559.77002,
    y: 597.53003,
    teleport: [],
  },
  {
    name: 'Đội trưởng tiền đồn Wang Pai',
    region: 24490,
    x: 613.01001,
    z: 26.469999,
    y: 524.17999,
    teleport: [],
  },
];

var ul_NPCs = $('#navigation-npc .sidebar-submenu ul');
for (var i = 0; i < NPCs.length; i++) {
  // Create html
  var html = '<b>' + NPCs[i].name + '</b>';
  for (var j = 0; j < NPCs[i].teleport.length; j++)
    html +=
      '<br><a href="#" onclick="xSROMap.FlyView(' +
      NPCs[i].teleport[j].x +
      ',' +
      NPCs[i].teleport[j].y +
      ',' +
      NPCs[i].teleport[j].z +
      ',' +
      NPCs[i].teleport[j].region +
      ')">' +
      NPCs[i].teleport[j].name +
      '</a>';
  // Add to map
  xSROMap.AddNPC(i, html, NPCs[i].x, NPCs[i].y, NPCs[i].z, NPCs[i].region);
  // Add to GUI
  ul_NPCs.append(
    '<li><a href="#" onclick="xSROMap.GoToNPC(' +
      i +
      ')">' +
      NPCs[i].name +
      '</a></li>'
  );
}
// Add Teleports: [ { name , x , z , y , region , type,  teleport : [ { name , x , z , y , region } , ... ] } , ...]
var TPs = [
  {
    name: 'Cổng dịch chuyển',
    region: 25000,
    x: 1254,
    z: -6,
    y: 1374,
    type: 0,
    teleport: [
      { name: 'Đôn Hoàng', region: 26265, x: 957, z: -80, y: 1508 },
      { name: 'Alexandria(Nam)', region: 23088, x: 663, z: 863, y: 526 },
      { name: 'Alexandria(Bắc)', region: 23603, x: 111, z: 1537, y: 524 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 26521,
    x: 962,
    z: -35,
    y: 8,
    type: 0,
    teleport: [
      { name: 'Trường An', region: 25000, x: 969, z: 0, y: 1369 },
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 23687,
    x: 1131,
    z: 305,
    y: 488,
    type: 0,
    teleport: [
      { name: 'Đôn Hoàng', region: 26265, x: 957, z: -80, y: 1508 },
      { name: 'Samarkand', region: 27244, x: 270, z: 180, y: 1421 },
      { name: 'Alexandria(Nam)', region: 23088, x: 663, z: 863, y: 526 },
      { name: 'Alexandria(Bắc)', region: 23603, x: 111, z: 1537, y: 524 },
      { name: 'Baghdad', region: 22618, x: 1075, z: -236, y: 323 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 26959,
    x: 700,
    z: 200,
    y: 886,
    type: 0,
    teleport: [{ name: 'Samarkand', region: 27244, x: 270, z: 180, y: 1421 }],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 27499,
    x: 1917,
    z: 250,
    y: 108,
    type: 0,
    teleport: [
      { name: 'Constantinople', region: 26959, x: 950, z: 84, y: 1070 },
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: -32766,
    x: 370,
    z: 1900,
    y: 830,
    type: 0,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -13674,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: -32766,
    x: 710,
    z: 1900,
    y: -295,
    type: 0,
    teleport: [
      {
        name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
        region: -32764,
        x: -15043,
        z: -98,
        y: 19789,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: -32766,
    x: -500,
    z: 1900,
    y: -590,
    type: 0,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: 352,
        z: 72,
        y: 78,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: -32766,
    x: -738,
    z: 1900,
    y: 489,
    type: 0,
    teleport: [
      {
        name: 'Tầng đầu tiên của lăng mộ Tần Thủy Hoàng',
        region: -32761,
        x: -1,
        z: -11,
        y: -3200,
      },
    ],
  },
  {
    name: 'Cổng của pháo đài Trường An (I)',
    region: 23719,
    x: 147,
    z: 175,
    y: 538,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 17221, x: 812, z: 31, y: 677 },
      { name: 'Cổng II của pháo đài', region: 17222, x: 1465, z: 13, y: 362 },
      { name: 'Cổng III của pháo đài', region: 17225, x: 894, z: 1, y: 332 },
    ],
  },
  {
    name: 'Cổng của pháo đài Trường An (II)',
    region: 23720,
    x: 118,
    z: 200,
    y: 504,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 17221, x: 812, z: 31, y: 677 },
      { name: 'Cổng II của pháo đài', region: 17222, x: 1465, z: 13, y: 362 },
      { name: 'Cổng III của pháo đài', region: 17225, x: 894, z: 1, y: 332 },
    ],
  },
  {
    name: 'Cổng của pháo đài Trường An (III)',
    region: 23721,
    x: 808,
    z: 41,
    y: 522,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 17221, x: 812, z: 31, y: 677 },
      { name: 'Cổng II của pháo đài', region: 17222, x: 1465, z: 13, y: 362 },
      { name: 'Cổng III của pháo đài', region: 17225, x: 894, z: 1, y: 332 },
    ],
  },
  {
    name: 'Cổng pháo đài (I)',
    region: 17221,
    x: 1115,
    z: 60,
    y: 490,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của pháo đài Trường An',
        region: 23719,
        x: 465,
        z: 145,
        y: 363,
      },
      {
        name: 'Cổng II của pháo đài Trường An',
        region: 23720,
        x: 72,
        z: 250,
        y: 162,
      },
      {
        name: 'Cổng III của pháo đài Trường An',
        region: 23721,
        x: 439,
        z: 14,
        y: 413,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (II)',
    region: 17222,
    x: 1118,
    z: 46,
    y: 452,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của pháo đài Trường An',
        region: 23719,
        x: 465,
        z: 145,
        y: 363,
      },
      {
        name: 'Cổng II của pháo đài Trường An',
        region: 23720,
        x: 72,
        z: 250,
        y: 162,
      },
      {
        name: 'Cổng III của pháo đài Trường An',
        region: 23721,
        x: 439,
        z: 14,
        y: 413,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (III)',
    region: 17225,
    x: 1259,
    z: 30,
    y: 364,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của pháo đài Trường An',
        region: 23719,
        x: 465,
        z: 145,
        y: 363,
      },
      {
        name: 'Cổng II của pháo đài Trường An',
        region: 23720,
        x: 72,
        z: 250,
        y: 162,
      },
      {
        name: 'Cổng III của pháo đài Trường An',
        region: 23721,
        x: 439,
        z: 14,
        y: 413,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 17989,
    x: 619,
    z: 46,
    y: 915,
    type: 3,
    teleport: [
      { name: 'Khải hoàn môn', region: 17224, x: 467, z: 0, y: 736 },
      { name: 'Cổng hồi sinh', region: 17735, x: 795, z: 0, y: 1407 },
    ],
  },
  {
    name: 'Khải hoàn môn',
    region: 17224,
    x: 482,
    z: 20,
    y: 439,
    type: 3,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 17989, x: 885, z: 31, y: 914 },
      { name: 'Cổng hồi sinh', region: 17735, x: 795, z: 0, y: 1407 },
    ],
  },
  {
    name: 'Cổng hồi sinh',
    region: 17735,
    x: 796,
    z: 15,
    y: 1472,
    type: 2,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 17989, x: 885, z: 31, y: 914 },
      { name: 'Khải hoàn môn', region: 17224, x: 467, z: 0, y: 736 },
      { name: 'Trường An', region: 25000, x: 969, z: 0, y: 1369 },
    ],
  },
  {
    name: 'Cổng của pháo đài Sơn Tặc Trại (I)',
    region: 23715,
    x: 196,
    z: 1262,
    y: 1145,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 17997, x: 747, z: 923, y: 956 },
      { name: 'Cổng II của pháo đài', region: 17999, x: 984, z: 644, y: 943 },
      {
        name: 'Cổng III của pháo đài',
        region: 18000,
        x: 1034,
        z: 682,
        y: 1156,
      },
    ],
  },
  {
    name: 'Cổng của pháo đài Sơn Tặc Trại (II)',
    region: 23459,
    x: 572,
    z: 1311,
    y: 1791,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 17997, x: 747, z: 923, y: 956 },
      { name: 'Cổng II của pháo đài', region: 17999, x: 984, z: 644, y: 943 },
      {
        name: 'Cổng III của pháo đài',
        region: 18000,
        x: 1034,
        z: 682,
        y: 1156,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (I)',
    region: 17997,
    x: 750,
    z: 953,
    y: 1258,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Sơn Tặc Trại',
        region: 23714,
        x: 1830,
        z: 1196,
        y: 1146,
      },
      {
        name: 'Cổng II của Pháo đài Sơn Tặc Trại',
        region: 23459,
        x: 462,
        z: 1286,
        y: 1491,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (II)',
    region: 17999,
    x: 982,
    z: 671,
    y: 1244,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Sơn Tặc Trại',
        region: 23714,
        x: 1830,
        z: 1196,
        y: 1146,
      },
      {
        name: 'Cổng II của Pháo đài Sơn Tặc Trại',
        region: 23459,
        x: 462,
        z: 1286,
        y: 1491,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (III)',
    region: 18000,
    x: 1034,
    z: 712,
    y: 1468,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Sơn Tặc Trại',
        region: 23714,
        x: 1830,
        z: 1196,
        y: 1146,
      },
      {
        name: 'Cổng II của Pháo đài Sơn Tặc Trại',
        region: 23459,
        x: 462,
        z: 1286,
        y: 1491,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 17743,
    x: 1499,
    z: 939,
    y: 827,
    type: 3,
    teleport: [
      { name: 'Khải hoàn môn', region: 17998, x: 448, z: 842, y: 1083 },
      { name: 'Cổng hồi sinh', region: 17231, x: 298, z: 1377, y: 584 },
    ],
  },
  {
    name: 'Khải hoàn môn',
    region: 17998,
    x: 446,
    z: 860,
    y: 1356,
    type: 3,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 17743, x: 1746, z: 932, y: 834 },
      { name: 'Cổng hồi sinh', region: 17231, x: 298, z: 1377, y: 584 },
    ],
  },
  {
    name: 'Cổng hồi sinh',
    region: 17231,
    x: 101,
    z: 1391,
    y: 587,
    type: 2,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 17743, x: 1746, z: 932, y: 834 },
      { name: 'Khải hoàn môn', region: 17998, x: 448, z: 842, y: 1083 },
      { name: 'Trường An', region: 25000, x: 969, z: 0, y: 1369 },
    ],
  },
  {
    name: 'Cổng của pháo đài Hoà Điền (I)',
    region: 24710,
    x: 593,
    z: -4,
    y: 50,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 14661, x: 2, z: -90, y: 1565 },
      { name: 'Cổng II của pháo đài', region: 14662, x: 36, z: -74, y: 1470 },
      { name: 'Cổng III của pháo đài', region: 14663, x: 153, z: 40, y: 1298 },
      { name: 'Cổng IV của pháo đài', region: 14664, x: 228, z: 80, y: 1111 },
    ],
  },
  {
    name: 'Cổng của pháo đài Hoà Điền (II)',
    region: 24711,
    x: 382,
    z: 63,
    y: 446,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 14661, x: 2, z: -90, y: 1565 },
      { name: 'Cổng II của pháo đài', region: 14662, x: 36, z: -74, y: 1470 },
      { name: 'Cổng III của pháo đài', region: 14663, x: 153, z: 40, y: 1298 },
      { name: 'Cổng IV của pháo đài', region: 14664, x: 228, z: 80, y: 1111 },
    ],
  },
  {
    name: 'Cổng của pháo đài Hoà Điền (III)',
    region: 24711,
    x: 1812,
    z: 61,
    y: 877,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 14661, x: 2, z: -90, y: 1565 },
      { name: 'Cổng II của pháo đài', region: 14662, x: 36, z: -74, y: 1470 },
      { name: 'Cổng III của pháo đài', region: 14663, x: 153, z: 40, y: 1298 },
      { name: 'Cổng IV của pháo đài', region: 14664, x: 228, z: 80, y: 1111 },
    ],
  },
  {
    name: 'Cổng pháo đài (I)',
    region: 14661,
    x: 20,
    z: 19,
    y: 1103,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Hoà Điền',
        region: 24710,
        x: 579,
        z: -39,
        y: 345,
      },
      {
        name: 'Cổng II của Pháo đài Hoà Điền',
        region: 24711,
        x: 386,
        z: 43,
        y: 694,
      },
      {
        name: 'Cổng III của Pháo đài Hoà Điền',
        region: 24711,
        x: 1691,
        z: 33,
        y: 1072,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (II)',
    region: 14662,
    x: 11,
    z: -20,
    y: 1147,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Hoà Điền',
        region: 24710,
        x: 579,
        z: -39,
        y: 345,
      },
      {
        name: 'Cổng II của Pháo đài Hoà Điền',
        region: 24711,
        x: 386,
        z: 43,
        y: 694,
      },
      {
        name: 'Cổng III của Pháo đài Hoà Điền',
        region: 24711,
        x: 1691,
        z: 33,
        y: 1072,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (III)',
    region: 14663,
    x: 10,
    z: 70,
    y: 1124,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Hoà Điền',
        region: 24710,
        x: 579,
        z: -39,
        y: 345,
      },
      {
        name: 'Cổng II của Pháo đài Hoà Điền',
        region: 24711,
        x: 386,
        z: 43,
        y: 694,
      },
      {
        name: 'Cổng III của Pháo đài Hoà Điền',
        region: 24711,
        x: 1691,
        z: 33,
        y: 1072,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (IV)',
    region: 14664,
    x: 9,
    z: 110,
    y: 1034,
    type: 1,
    teleport: [
      {
        name: 'Cổng I của Pháo đài Hoà Điền',
        region: 24710,
        x: 579,
        z: -39,
        y: 345,
      },
      {
        name: 'Cổng II của Pháo đài Hoà Điền',
        region: 24711,
        x: 386,
        z: 43,
        y: 694,
      },
      {
        name: 'Cổng III của Pháo đài Hoà Điền',
        region: 24711,
        x: 1691,
        z: 33,
        y: 1072,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 15172,
    x: 753,
    z: 62,
    y: 8,
    type: 3,
    teleport: [
      { name: 'Khải hoàn môn', region: 15176, x: 1583, z: -64, y: 374 },
      { name: 'Cổng hồi sinh', region: 15175, x: 1417, z: 85, y: 160 },
    ],
  },
  {
    name: 'Khải hoàn môn',
    region: 15176,
    x: 1787,
    z: -25,
    y: 358,
    type: 3,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 15172, x: 808, z: 46, y: 118 },
      { name: 'Cổng hồi sinh', region: 15175, x: 1417, z: 85, y: 160 },
    ],
  },
  {
    name: 'Cổng hồi sinh',
    region: 15175,
    x: 1633,
    z: 99,
    y: 47,
    type: 2,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 15172, x: 808, z: 46, y: 118 },
      { name: 'Khải hoàn môn', region: 15176, x: 1583, z: -64, y: 374 },
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
    ],
  },
  {
    name: 'Cổng trời',
    region: 23406,
    x: 1883,
    z: 4138,
    y: 1912,
    type: 0,
    teleport: [
      { name: 'GATE_RC_ROC_GATE', region: 26045, x: 1027, z: -41, y: 822 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Lăng mộ Pharaoh)',
    region: 19019,
    x: 1690,
    z: 600,
    y: 1782,
    type: 0,
    teleport: [
      {
        name: 'Lăng mộ Pharaoh(tập sự)',
        region: 29631,
        x: 1559,
        z: 755,
        y: 1775,
      },
      {
        name: 'Lăng mộ Pharaoh(trung cấp)',
        region: 31423,
        x: 1559,
        z: 755,
        y: 1775,
      },
      {
        name: 'Lăng mộ Pharaoh(cao cấp)',
        region: 31410,
        x: 1559,
        z: 755,
        y: 1775,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Lối thoát lăng mộ Pharaoh)',
    region: 29631,
    x: 1270,
    z: 735,
    y: 1779,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Lối thoát lăng mộ Pharaoh)',
    region: 31423,
    x: 1270,
    z: 735,
    y: 1779,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Lối thoát lăng mộ Pharaoh)',
    region: 31410,
    x: 1270,
    z: 735,
    y: 1779,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Thung lũng Hoàng Gia)',
    region: 29380,
    x: 533,
    z: 815,
    y: 730,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (lăng mộ Pharaoh)',
    region: 31172,
    x: 533,
    z: 815,
    y: 730,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Lối thoát lăng mộ Pharaoh)',
    region: 31159,
    x: 533,
    z: 815,
    y: 730,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19019, x: 202, z: 398, y: 1782 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 22347,
    x: 1627,
    z: 300,
    y: 554,
    type: 0,
    teleport: [{ name: 'Đền thờ', region: -32752, x: -4027, z: 58, y: -3717 }],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 21067,
    x: 1470,
    z: 300,
    y: 301,
    type: 0,
    teleport: [{ name: 'Đền thờ', region: -32752, x: 4376, z: 55, y: 4707 }],
  },
  {
    name: 'Cổng dịch chuyển (Nam)',
    region: 23088,
    x: 612,
    z: 910,
    y: 1089,
    type: 0,
    teleport: [
      { name: 'Trường An', region: 25000, x: 969, z: 0, y: 1369 },
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
      { name: 'Alexandria(Bắc)', region: 23603, x: 111, z: 1537, y: 524 },
      { name: 'Baghdad', region: 22618, x: 1075, z: -236, y: 323 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Bắc)',
    region: 23602,
    x: 1719,
    z: 1586,
    y: 760,
    type: 0,
    teleport: [
      { name: 'Trường An', region: 25000, x: 969, z: 0, y: 1369 },
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
      { name: 'Alexandria(Nam)', region: 23088, x: 663, z: 863, y: 526 },
      { name: 'Baghdad', region: 22618, x: 1075, z: -236, y: 323 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (khu vực Delta)',
    region: 23608,
    x: 459,
    z: 1230,
    y: 1264,
    type: 0,
    teleport: [
      {
        name: 'Sa mạc Phong Bạo Ô Vân',
        region: 21569,
        x: 1206,
        z: 218,
        y: 1822,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển (khu vực Delta)',
    region: 21812,
    x: 937,
    z: 697,
    y: 1392,
    type: 0,
    teleport: [
      { name: 'Thung lũng các vị vua', region: 19001, x: 910, z: 221, y: 1793 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 21569,
    x: 486,
    z: 486,
    y: 1918,
    type: 0,
    teleport: [
      { name: 'Vùng đất màu mỡ', region: 23608, x: 171, z: 1179, y: 828 },
    ],
  },
  {
    name: 'Cổng dịch chuyển (Thung lũng Hoàng Gia)',
    region: 19001,
    x: 262,
    z: 430,
    y: 1903,
    type: 0,
    teleport: [
      {
        name: 'Bình nguyên bị quên lãng',
        region: 21812,
        x: 1151,
        z: 613,
        y: 1636,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 24902,
    x: 1490,
    z: 477,
    y: 1831,
    type: 0,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 23498, x: 253, z: -204, y: 1519 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 23498,
    x: 155,
    z: -210,
    y: 1530,
    type: 0,
    teleport: [
      { name: 'Thế giới nguyên thủy', region: 25158, x: 1506, z: 476, y: 27 },
    ],
  },
  {
    name: 'Lối vào Lôi thần điện',
    region: 22219,
    x: 824,
    z: 476,
    y: 1804,
    type: 0,
    teleport: [
      {
        name: 'Đền thờ tôn kính Sơ cấp',
        region: 32236,
        x: 950,
        z: 880,
        y: 900,
      },
      {
        name: 'Đền thờ tôn kính Trung cấp - 111Lv',
        region: 32236,
        x: 950,
        z: 880,
        y: 900,
      },
      {
        name: 'Đền thờ tôn kính Cao cấp - 113Lv',
        region: 32236,
        x: 830,
        z: 880,
        y: 900,
      },
      {
        name: 'Nơi ẩn náu của những kẻ cuồng tín Sơ cấp',
        region: -32746,
        x: -2,
        z: 1,
        y: -137,
      },
      {
        name: 'Nơi ẩn náu của những kẻ cuồng tín Trung cấp - 116Lv',
        region: -32746,
        x: -2,
        z: 1,
        y: -137,
      },
      {
        name: 'Nơi ẩn náu của những kẻ cuồng tín Cao cấp - 118Lv',
        region: -32746,
        x: 1080,
        z: 1,
        y: 630,
      },
    ],
  },
  {
    name: 'Đền thờ tôn kính',
    region: 32236,
    x: 990,
    z: 870,
    y: 860,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Đền thờ tôn kính',
    region: 32236,
    x: 990,
    z: 870,
    y: 860,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 2,
    z: 1,
    y: 14,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 2,
    z: 1,
    y: 14,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 1730,
    z: 1,
    y: 1000,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 1730,
    z: 1,
    y: 1000,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: -1700,
    z: 1,
    y: 970,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 0,
    z: 1,
    y: -1960,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: -1700,
    z: 1,
    y: 970,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 0,
    z: 1,
    y: -1960,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Đền thờ tôn kính',
    region: 32236,
    x: 990,
    z: 870,
    y: 860,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Nơi ẩn náu của những kẻ cuồng tín',
    region: -32746,
    x: 2,
    z: 1,
    y: 14,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'GATE_JUPITER_B0_1',
    region: -32746,
    x: 0,
    z: 1,
    y: -1960,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'GATE_JUPITER_B0_2',
    region: -32746,
    x: -1700,
    z: 1,
    y: 970,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'GATE_JUPITER_B0_3',
    region: -32746,
    x: 1730,
    z: 1,
    y: 1000,
    type: 0,
    teleport: [
      { name: 'Lối vào Lôi thần điện', region: 22219, x: 837, z: 475, y: 1901 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 22618,
    x: 1015,
    z: -236,
    y: 607,
    type: 0,
    teleport: [
      { name: 'Vương quốc Hoà Điền', region: 23687, x: 1138, z: 250, y: 153 },
      { name: 'Alexandria(Nam)', region: 23088, x: 663, z: 863, y: 526 },
      { name: 'Alexandria(Bắc)', region: 23603, x: 111, z: 1537, y: 524 },
    ],
  },
  {
    name: 'Cổng (C)',
    region: 22362,
    x: 1359,
    z: -236,
    y: 1879,
    type: 0,
    teleport: [
      { name: 'Cổng (N)', region: 22874, x: 1798, z: -430, y: 835 },
      { name: 'Cổng (W)', region: 22617, x: 724, z: -431, y: 481 },
      { name: 'Cổng (S)', region: 22106, x: 1316, z: -432, y: 832 },
    ],
  },
  {
    name: 'Cổng (N)',
    region: 22874,
    x: 1864,
    z: -430,
    y: 931,
    type: 0,
    teleport: [
      { name: 'Cổng (C)', region: 22618, x: 1287, z: -236, y: 36 },
      { name: 'Cổng (W)', region: 22617, x: 724, z: -431, y: 481 },
      { name: 'Cổng (S)', region: 22106, x: 1316, z: -432, y: 832 },
    ],
  },
  {
    name: 'Cổng (W)',
    region: 22617,
    x: 826,
    z: -430,
    y: 517,
    type: 0,
    teleport: [
      { name: 'Cổng (C)', region: 22618, x: 1287, z: -236, y: 36 },
      { name: 'Cổng (N)', region: 22874, x: 1798, z: -430, y: 835 },
      { name: 'Cổng (S)', region: 22106, x: 1316, z: -432, y: 832 },
    ],
  },
  {
    name: 'Cổng (S)',
    region: 22106,
    x: 1224,
    z: -432,
    y: 767,
    type: 0,
    teleport: [
      { name: 'Cổng (C)', region: 22618, x: 1287, z: -236, y: 36 },
      { name: 'Cổng (N)', region: 22874, x: 1798, z: -430, y: 835 },
      { name: 'Cổng (W)', region: 22617, x: 724, z: -431, y: 481 },
    ],
  },
  {
    name: 'Rãnh nứt sa mạc',
    region: 22101,
    x: 846,
    z: 0,
    y: 293,
    type: 0,
    teleport: [
      { name: 'Aỏ ảnh sa mạc', region: 20815, x: 332, z: 229, y: 514 },
    ],
  },
  {
    name: 'Rãnh nứt sa mạc',
    region: 20815,
    x: 230,
    z: 255,
    y: 546,
    type: 0,
    teleport: [
      { name: 'Trường Giáo Hội', region: 22101, x: 750, z: 0, y: 300 },
    ],
  },
  {
    name: 'Cổng trú ẩn',
    region: 18769,
    x: 1001,
    z: -319,
    y: 492,
    type: 0,
    teleport: [
      { name: 'Nơi cất giấu của Kalia', region: -32743, x: 0, z: 7, y: 360 },
    ],
  },
  {
    name: 'Lỗ hổng thực tại',
    region: 23636,
    x: 1589,
    z: -430,
    y: 1200,
    type: 0,
    teleport: [
      { name: 'Già làng Kerim', region: 22106, x: 443, z: -432, y: 1529 },
    ],
  },
  {
    name: 'Lỗ hổng thực tại',
    region: 23891,
    x: 1012,
    z: -236,
    y: 606,
    type: 0,
    teleport: [
      { name: 'Già làng Kerim', region: 22106, x: 443, z: -432, y: 1529 },
    ],
  },
  {
    name: 'Cổng trú ẩn',
    region: -32743,
    x: 0,
    z: 7,
    y: 450,
    type: 0,
    teleport: [
      { name: 'Aỏ ảnh sa mạc', region: 18769, x: 961, z: -341, y: 574 },
    ],
  },
  {
    name: 'Cổng của pháo đài Constantinople (I)',
    region: 25933,
    x: 370,
    z: -76,
    y: 190,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 15451, x: 1471, z: 75, y: 877 },
      { name: 'Cổng II của pháo đài', region: 15963, x: 1174, z: 10, y: 1161 },
      { name: 'Cổng III của pháo đài', region: 16219, x: 1009, z: 40, y: 747 },
    ],
  },
  {
    name: 'Cổng pháo đài (I)',
    region: 15451,
    x: 1197,
    z: 76,
    y: 876,
    type: 1,
    teleport: [
      {
        name: 'Cổng của Pháo đài Constatinople',
        region: 25933,
        x: 252,
        z: -80,
        y: 181,
      },
      {
        name: 'Cổng I của pháo đài Constantinople',
        region: 26189,
        x: 1,
        z: -68,
        y: 973,
      },
      {
        name: 'Cổng III của pháo đài Constantinople',
        region: 25676,
        x: 1583,
        z: -62,
        y: 359,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (II)',
    region: 15963,
    x: 898,
    z: 34,
    y: 1155,
    type: 1,
    teleport: [
      {
        name: 'Cổng của Pháo đài Constatinople',
        region: 25933,
        x: 252,
        z: -80,
        y: 181,
      },
      {
        name: 'Cổng I của pháo đài Constantinople',
        region: 26189,
        x: 1,
        z: -68,
        y: 973,
      },
      {
        name: 'Cổng III của pháo đài Constantinople',
        region: 25676,
        x: 1583,
        z: -62,
        y: 359,
      },
    ],
  },
  {
    name: 'Cổng pháo đài (III)',
    region: 16219,
    x: 737,
    z: 58,
    y: 758,
    type: 1,
    teleport: [
      {
        name: 'Cổng của Pháo đài Constatinople',
        region: 25933,
        x: 252,
        z: -80,
        y: 181,
      },
      {
        name: 'Cổng I của pháo đài Constantinople',
        region: 26189,
        x: 1,
        z: -68,
        y: 973,
      },
      {
        name: 'Cổng III của pháo đài Constantinople',
        region: 25676,
        x: 1583,
        z: -62,
        y: 359,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 16222,
    x: 1023,
    z: 26,
    y: 1247,
    type: 3,
    teleport: [
      { name: 'Khải hoàn môn', region: 15707, x: 1207, z: 102, y: 849 },
      { name: 'Cổng hồi sinh', region: 15710, x: 1224, z: 0, y: 1132 },
    ],
  },
  {
    name: 'Khải hoàn môn',
    region: 15707,
    x: 913,
    z: 116,
    y: 842,
    type: 3,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 16222, x: 864, z: -3, y: 1026 },
      { name: 'Cổng hồi sinh', region: 15710, x: 1224, z: 0, y: 1132 },
    ],
  },
  {
    name: 'Cổng hồi sinh',
    region: 15710,
    x: 1225,
    z: 0,
    y: 1031,
    type: 2,
    teleport: [
      { name: 'Cổng dịch chuyển', region: 16222, x: 864, z: -3, y: 1026 },
      { name: 'Khải hoàn môn', region: 15707, x: 1207, z: 102, y: 849 },
      { name: 'Constantinople', region: 26959, x: 950, z: 84, y: 1070 },
    ],
  },
  {
    name: 'Cổng của pháo đài Constantinople (II)',
    region: 26189,
    x: 91,
    z: -104,
    y: 973,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 15451, x: 1471, z: 75, y: 877 },
      { name: 'Cổng II của pháo đài', region: 15963, x: 1174, z: 10, y: 1161 },
      { name: 'Cổng III của pháo đài', region: 16219, x: 1009, z: 40, y: 747 },
    ],
  },
  {
    name: 'Cổng của pháo đài Constantinople (III)',
    region: 25676,
    x: 1609,
    z: -37,
    y: 134,
    type: 1,
    teleport: [
      { name: 'Cổng I của pháo đài', region: 15451, x: 1471, z: 75, y: 877 },
      { name: 'Cổng II của pháo đài', region: 15963, x: 1174, z: 10, y: 1161 },
      { name: 'Cổng III của pháo đài', region: 16219, x: 1009, z: 40, y: 747 },
    ],
  },
  {
    name: 'GATE_DUMMY',
    region: 25256,
    x: 960,
    z: 40,
    y: 1205,
    type: 0,
    teleport: [
      { name: 'GATE_HUNTER_SPAWN', region: 32242, x: 1243, z: -1832, y: 7 },
      { name: 'GATE_THIEF_SPAWN', region: 31985, x: 507, z: -1832, y: 1902 },
    ],
  },
  {
    name: 'Nhà sư (lối vào Shambhana)',
    region: 27011,
    x: 1751,
    z: 0,
    y: 987,
    type: 0,
    teleport: [
      {
        name: 'GATE_OTHER_SKYTEMPLE_A',
        region: 25567,
        x: 1295,
        z: 40,
        y: 1282,
      },
      {
        name: 'GATE_OTHER_SKYTEMPLE_B',
        region: 25576,
        x: 1348,
        z: 50,
        y: 1339,
      },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 25567,
    x: 943,
    z: 25,
    y: 1694,
    type: 0,
    teleport: [{ name: 'Takla Makan', region: 27011, x: 1836, z: 10, y: 694 }],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 25576,
    x: 919,
    z: 25,
    y: 1659,
    type: 0,
    teleport: [{ name: 'Takla Makan', region: 27011, x: 1836, z: 10, y: 694 }],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 23007,
    x: 950,
    z: 25,
    y: 1685,
    type: 0,
    teleport: [
      { name: 'Nhà Tiên Tri Cổ Đại', region: 23687, x: 1351, z: 243, y: 135 },
      { name: 'Baghdad', region: 22106, x: 1579, z: -433, y: 1738 },
    ],
  },
  {
    name: 'Cổng dịch chuyển',
    region: 24300,
    x: 1344,
    z: 258,
    y: 660,
    type: 0,
    teleport: [
      { name: 'Tướng về hưu Hasim', region: 25480, x: 1809, z: 96, y: 1189 },
    ],
  },
  {
    name: 'Làng Đạo Tặc',
    region: 27027,
    x: 1814,
    z: 452,
    y: 1834,
    type: 5,
    teleport: [
      { name: 'Làng Đạo Tặc', region: -32767, x: 1011, z: 0, y: -862 },
    ],
  },
  {
    name: 'Làng Đạo Tặc',
    region: -32767,
    x: 1011,
    z: 0,
    y: -862,
    type: 5,
    teleport: [
      { name: 'Làng Đạo Tặc', region: 27027, x: 1814, z: 452, y: 1834 },
    ],
  },
  {
    name: 'Bến bắc Karakolam',
    region: 23929,
    x: 862,
    z: 2105,
    y: 1623,
    type: 5,
    teleport: [
      {
        name: 'Người bán vé thuyền bay Ajati',
        region: 24438,
        x: 888,
        z: 2523,
        y: 538,
      },
      {
        name: 'Người bán vé thuyền bay Sayun',
        region: 22390,
        x: 909,
        z: 2516,
        y: 267,
      },
      {
        name: 'Saena - Người bán vé phi thuyền',
        region: 25975,
        x: 1367,
        z: 296,
        y: 1626,
      },
    ],
  },
  {
    name: 'Tầng đầu tiên của lăng mộ Tần Thủy Hoàng',
    region: -32761,
    x: -1,
    z: -11,
    y: -3200,
    type: 5,
    teleport: [
      {
        name: 'Lăng  mộ Tần Thuỷ Hoàng',
        region: 26284,
        x: 960,
        z: 111,
        y: 1662,
      },
    ],
  },
  {
    name: 'Lăng  mộ Tần Thuỷ Hoàng',
    region: 26284,
    x: 960,
    z: 111,
    y: 1662,
    type: 5,
    teleport: [
      {
        name: 'Tầng đầu tiên của lăng mộ Tần Thủy Hoàng',
        region: -32761,
        x: -1,
        z: -11,
        y: -3200,
      },
    ],
  },
  {
    name: 'Lăng  mộ Tần Thuỷ Hoàng',
    region: -32761,
    x: 2,
    z: 223,
    y: 6495,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -13674,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -13674,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Lăng  mộ Tần Thuỷ Hoàng',
        region: -32761,
        x: 2,
        z: 223,
        y: 6495,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -10468,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -8259,
        z: 0,
        y: 5592,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -3858,
    z: 0,
    y: 5592,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -1628,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -6068,
        z: 0,
        y: 1640,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -8259,
    z: 0,
    y: 5592,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -10468,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -18152,
        z: 0,
        y: 1633,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 12124,
        z: 0,
        y: 7228,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 4610,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 4580,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 6208,
        z: 0,
        y: 4035,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -5,
        z: 0,
        y: 2173,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -1628,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -3858,
        z: 0,
        y: 5592,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 7827,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 10497,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -3,
        z: 0,
        y: 7197,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 13727,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 16480,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 12124,
    z: 0,
    y: 4030,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 12124,
        z: 0,
        y: 1633,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 10497,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 7827,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 10496,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 7809,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 12124,
    z: 0,
    y: 1633,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 12124,
        z: 0,
        y: 4030,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 7809,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 10496,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 4580,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 2197,
        z: 0,
        y: -27,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 2197,
    z: 0,
    y: -27,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 4580,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -2203,
    z: 0,
    y: -27,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -4458,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -4458,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -2203,
        z: 0,
        y: -27,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -7704,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -10470,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -10470,
    z: 0,
    y: -21,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -7704,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -12072,
    z: 0,
    y: -1587,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -12072,
        z: 0,
        y: -3616,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -9871,
    z: 0,
    y: -5818,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -7684,
        z: 0,
        y: -5813,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -12072,
    z: 0,
    y: -3616,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -12072,
        z: 0,
        y: -1587,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -4458,
    z: 0,
    y: -5813,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -1593,
        z: 0,
        y: -5819,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -7684,
    z: 0,
    y: -5813,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -9871,
        z: 0,
        y: -5818,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -18150,
        z: 0,
        y: -4157,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -5,
        z: 0,
        y: -2223,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 4610,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 1569,
    z: 0,
    y: -5818,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 4581,
        z: 0,
        y: -5814,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 18103,
        z: 0,
        y: -1593,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -12073,
        z: 0,
        y: -8021,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -1593,
    z: 0,
    y: -5819,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -4458,
        z: 0,
        y: -5813,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: -1567,
    z: 0,
    y: -5817,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -3858,
        z: 0,
        y: 5592,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -6068,
        z: 0,
        y: -1593,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 12124,
        z: 0,
        y: -1587,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 7809,
    z: 0,
    y: -5814,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 9924,
        z: 0,
        y: -5821,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 4581,
    z: 0,
    y: -5814,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 1569,
        z: 0,
        y: -5818,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 14325,
    z: 0,
    y: -5818,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 16479,
        z: 0,
        y: -5815,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 9924,
    z: 0,
    y: -5821,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 7809,
        z: 0,
        y: -5814,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 19707,
    z: 0,
    y: -5814,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: 352,
        z: 72,
        y: 78,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 16479,
    z: 0,
    y: -5815,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 14325,
        z: 0,
        y: -5818,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 16480,
    z: 0,
    y: 5596,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 13727,
        z: 0,
        y: 5596,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -13804,
        z: 0,
        y: -27,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 13730,
        z: 0,
        y: -21,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: -14275,
        z: 0,
        y: -5824,
      },
    ],
  },
  {
    name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
    region: -32763,
    x: 352,
    z: 72,
    y: 78,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 19707,
        z: 0,
        y: -5814,
      },
    ],
  },
  {
    name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
    region: -32763,
    x: 19140,
    z: 549,
    y: 15784,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
        region: -32764,
        x: 18267,
        z: -98,
        y: 14340,
      },
    ],
  },
  {
    name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
    region: -32763,
    x: 15855,
    z: 549,
    y: -18952,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
        region: -32764,
        x: 15463,
        z: -126,
        y: -19780,
      },
    ],
  },
  {
    name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
    region: -32763,
    x: -19110,
    z: 584,
    y: -16170,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
        region: -32764,
        x: -17850,
        z: -126,
        y: -14329,
      },
    ],
  },
  {
    name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
    region: -32763,
    x: -15711,
    z: 549,
    y: 19794,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
        region: -32764,
        x: -15043,
        z: -98,
        y: 19789,
      },
    ],
  },
  {
    name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
    region: -32764,
    x: 18267,
    z: -98,
    y: 14340,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: 19140,
        z: 549,
        y: 15784,
      },
    ],
  },
  {
    name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
    region: -32764,
    x: 15463,
    z: -126,
    y: -19780,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: 15855,
        z: 549,
        y: -18952,
      },
    ],
  },
  {
    name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
    region: -32764,
    x: -17850,
    z: -126,
    y: -14329,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: -19110,
        z: 584,
        y: -16170,
      },
    ],
  },
  {
    name: 'Tầng thứ tư của lăng mộ Tần Thủy Hoàng',
    region: -32764,
    x: -15043,
    z: -98,
    y: 19789,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ ba của lăng mộ Tần Thủy Hoàng',
        region: -32763,
        x: -15711,
        z: 549,
        y: 19794,
      },
    ],
  },
  {
    name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
    region: -32762,
    x: 0,
    z: 0,
    y: 0,
    type: 5,
    teleport: [
      {
        name: 'Tầng thứ hai của lăng mộ Tần Thủy Hoàng',
        region: -32762,
        x: 6208,
        z: 0,
        y: 4035,
      },
    ],
  },
  {
    name: 'GATE_RC_ROC_GATE',
    region: 26045,
    x: 1027,
    z: -41,
    y: 822,
    type: 5,
    teleport: [
      { name: 'Lạc Khắc Sơn', region: 23406, x: 1382, z: 4056, y: 1558 },
    ],
  },
  {
    name: 'Đền thờ',
    region: -32752,
    x: -4027,
    z: 58,
    y: -3717,
    type: 5,
    teleport: [
      { name: 'Sa mạc Phong Bạo Ô Vân', region: 22347, x: 965, z: 49, y: 423 },
    ],
  },
  {
    name: 'Đền thờ',
    region: -32752,
    x: 4376,
    z: 55,
    y: 4707,
    type: 5,
    teleport: [
      { name: 'Sa mạc Phong Bạo Ô Vân', region: 21067, x: 815, z: 20, y: 574 },
    ],
  },
  {
    name: 'Baghdad',
    region: 22106,
    x: 1579,
    z: -433,
    y: 1738,
    type: 5,
    teleport: [
      {
        name: 'GATE_OTHER_SKYTEMPLE_C',
        region: 23007,
        x: 1301,
        z: 50,
        y: 1307,
      },
    ],
  },
  {
    name: 'GATE_ENTRANCE_TO_VENEFICA',
    region: 24470,
    x: 1774,
    z: -21,
    y: 1520,
    type: 5,
    teleport: [
      { name: 'Đá dịch chuyển', region: -32739, x: 191, z: 7, y: -296 },
      { name: 'Đá dịch chuyển', region: -32738, x: -12, z: 7, y: -471 },
    ],
  },
];

for (var i = 0; i < TPs.length; i++) {
  // Create html
  var html = '<b>' + TPs[i].name + '</b>';
  for (var j = 0; j < TPs[i].teleport.length; j++)
    html +=
      '<br><a href="#" onclick="xSROMap.FlyView(' +
      TPs[i].teleport[j].x +
      ',' +
      TPs[i].teleport[j].y +
      ',' +
      TPs[i].teleport[j].z +
      ',' +
      TPs[i].teleport[j].region +
      ')">' +
      TPs[i].teleport[j].name +
      '</a>';
  // Add to map
  xSROMap.AddTeleport(
    html,
    TPs[i].type,
    TPs[i].x,
    TPs[i].y,
    TPs[i].z,
    TPs[i].region
  );
}
// Player example
xSROMap.AddPlayer(
  'JellyBitz',
  '<a href="#"><b>JellyBitz</b></a><br><i>Hi, I\'ll be here watching you!<br>And you can\'t do nothing about ... >:)</i>',
  116.75,
  117
);
// Activate drawing creator
xSROMap.ShowDrawingToolbar(
  'topright',
  true,
  false,
  true,
  false,
  true,
  true,
  true,
  true,
  false,
  true
);

// Examples about how to add shapes
//xSROMap.AddDrawingShape('Marker',[113,-205],'<b>Hotan Kingdom (S)</b>');
//xSROMap.AddDrawingShape('Polyline',[[115,255],[115,368],[115,428]],'<b>City to Palace</b>');
//xSROMap.AddDrawingShape('Polygon',[[-91,131],[35,255],[208,254],[329,129],[331,-46],[210,-166],[34,-169],[-92,-40]],'<b>Hotan Kingdom</b>');
//xSROMap.AddDrawingShape('Circle',[-66,228],25);

/*
 * Sidebar actions
 */

// sidebar dropdown menu lv.1
$('.sidebar-dropdown > a').click(function () {
  $('.sidebar-submenu').slideUp(200);
  if ($(this).parent().hasClass('active')) {
    $('.sidebar-dropdown').removeClass('active');
    $(this).parent().removeClass('active');
  } else {
    $('.sidebar-dropdown').removeClass('active');
    $(this).next('.sidebar-submenu').slideDown(200);
    $(this).parent().addClass('active');
  }
});
// sidebar dropdown menu lv.2
$('.sidebar-submenu-dropdown > a').click(function () {
  $('.sidebar-submenu-submenu').slideUp(200);
  if ($(this).parent().hasClass('active')) {
    $('.sidebar-submenu-dropdown').removeClass('active');
    $(this).parent().removeClass('active');
  } else {
    $('.sidebar-submenu-dropdown').removeClass('active');
    $(this).next('.sidebar-submenu-submenu').slideDown(200);
    $(this).parent().addClass('active');
  }
});
// sidebar toggle
$('#close-sidebar').click(function () {
  $('.page-wrapper').removeClass('toggled');
});
$('#show-sidebar').click(function () {
  $('.page-wrapper').addClass('toggled');
});
// filter
$('#search input[type="text"]').keyup(function () {
  var searchText = $(this).val();

  // check if value are coordinates type
  if (searchText.split(',').length > 1) searchText = '';
  else searchText = searchText.toLowerCase();

  // Navigate through every category and all his items
  $('#navigation li.sidebar-dropdown').each(function (index) {
    var showCounter = 0;
    $(this)
      .find('.sidebar-submenu>ul>li')
      .each(function (index) {
        if ($(this).text().toLowerCase().indexOf(searchText) > -1) {
          $(this).show();
          showCounter++;
        } else {
          $(this).hide();
        }
      });

    // hide category if has no match
    if (showCounter > 0) $(this).show();
    else $(this).hide();
  });
});
// Coordinate search on click/enter
searchId = 0;
$('#search .input-group-append').click(function () {
  var searchCoordinates = $('#search input[type="text"]').val().split(',');
  // check if value are coordinates type
  if (searchCoordinates.length > 1) {
    var x = parseFloat(searchCoordinates[0]);
    var y = parseFloat(searchCoordinates[1]);
    // x and y correctly parsed?
    if (!isNaN(x) && !isNaN(y)) {
      // check if is a region coordinate
      if (searchCoordinates.length == 4) {
        var z = parseFloat(searchCoordinates[2]);
        var r = parseFloat(searchCoordinates[3]);
        if (!isNaN(z) && !isNaN(r)) {
          xSROMap.SetView(x, y, z, r);
          // Add visual reference
          xSROMap.AddLocation(
            searchId,
            '<a href="#" onclick="xSROMap.RemoveLocation(' +
              searchId++ +
              ')">Remove <i class="fa fa-thrash-check"></i></a>',
            x,
            y,
            z,
            r
          );
        }
      } else {
        xSROMap.SetView(x, y);
        // Add visual reference
        xSROMap.AddLocation(
          searchId,
          '<a href="#" onclick="xSROMap.RemoveLocation(' +
            searchId++ +
            ')">Remove <i class="fa fa-thrash-check"></i></a>',
          x,
          y
        );
      }
    }
  }
});
$('#search input[type="text"]').keypress(function (e) {
  if (e.which == 13) {
    $('#search .input-group-append').click();
  }
});

// Show coordinates link at search box
window.onload = function () {
  // Reading GET inputs
  var GET = function (parameter) {
    var tmp;
    var items = location.search.substr(1).split('&');
    for (var i = 0; i < items.length; i++) {
      tmp = items[i].split('=');
      if (tmp[0] === parameter) return decodeURIComponent(tmp[1]);
    }
    return null;
  };
  var x = parseFloat(GET('x'));
  var y = parseFloat(GET('y'));
  if (!isNaN(x) && !isNaN(y)) {
    var z = parseFloat(GET('z'));
    var r = parseFloat(GET('region'));
    // Show link
    if (!isNaN(z) && !isNaN(r))
      $('#search input[type="text"]').val(x + ',' + y + ',' + z + ',' + r);
    else $('#search input[type="text"]').val(x + ',' + y);
  }
};

/*
 * Script Generator
 */

var ImportDrawingLayers = function () {
  var textarea = $('#textareaScriptEditor').val();
  if (textarea == '') return;

  var lines = textarea.match(/[^\r\n]+/g);
  // analyze script type
  var type = $('#selectEditorType').val();
  // default type
  if (type.startsWith('--')) type = null;

  if (type == null) {
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('> Marker')) {
        // Check next line position
        if (i + 1 < lines.length) {
          var pos = lines[i + 1].split(',');
          if (
            pos.length == 2 &&
            pos[0].startsWith('PosX:') &&
            pos[1].startsWith('PosY:')
          ) {
            var posX = parseFloat(pos[0].substr(5));
            var posY = parseFloat(pos[1].substr(5));
            if (!isNaN(posX) && !isNaN(posY)) {
              xSROMap.AddDrawingShape(
                'Marker',
                [posX, posY],
                lines[i].substr(9)
              );
              i++;
            }
          } else if (
            pos.length == 4 &&
            pos[0].startsWith('X:') &&
            pos[1].startsWith('Y:') &&
            pos[2].startsWith('Z:') &&
            pos[3].startsWith('Region:')
          ) {
            var x = parseFloat(pos[0].substr(2));
            var y = parseFloat(pos[1].substr(2));
            var z = parseFloat(pos[2].substr(2));
            var r = parseFloat(pos[3].substr(7));
            if (!isNaN(x) && !isNaN(y) && !isNaN(z) && !isNaN(r)) {
              xSROMap.AddDrawingShape(
                'Marker',
                [x, y, z, r],
                lines[i].substr(9)
              );
              i++;
            }
          }
        }
      } else if (
        lines[i].startsWith('> Polyline') ||
        lines[i].startsWith('> Polygon')
      ) {
        var t = lines[i].startsWith('> Polyl') ? 'Polyline' : 'Polygon';
        var coords = [];
        var param2 = lines[i].substr(t.length + 3);
        // extract and leave the cursor when cannot continue
        var j = i + 1;
        while (j < lines.length) {
          var pos = lines[j].split(',');
          if (
            pos.length == 2 &&
            pos[0].startsWith('PosX:') &&
            pos[1].startsWith('PosY:')
          ) {
            var posX = parseFloat(pos[0].substr(5));
            var posY = parseFloat(pos[1].substr(5));
            if (!isNaN(posX) && !isNaN(posY)) {
              coords.push([posX, posY]);
              j++;
              i = j - 1;
              continue;
            }
          } else if (
            pos.length == 4 &&
            pos[0].startsWith('X:') &&
            pos[1].startsWith('Y:') &&
            pos[2].startsWith('Z:') &&
            pos[3].startsWith('Region:')
          ) {
            var x = parseFloat(pos[0].substr(2));
            var y = parseFloat(pos[1].substr(2));
            var z = parseFloat(pos[2].substr(2));
            var r = parseFloat(pos[3].substr(7));
            if (!isNaN(x) && !isNaN(y) && !isNaN(z) && !isNaN(r)) {
              coords.push([x, y, z, r]);
              j++;
              i = j - 1;
              continue;
            }
          }
          break;
        }
        xSROMap.AddDrawingShape(t, coords, param2);
      } else if (lines[i].startsWith('> Circle')) {
        // Check next line position
        if (i + 1 < lines.length) {
          var pos = lines[i + 1].split(',');
          if (
            pos.length >= 2 &&
            pos[0].startsWith('PosX:') &&
            pos[1].startsWith('PosY:')
          ) {
            var posX = parseFloat(pos[0].substr(5));
            var posY = parseFloat(pos[1].substr(5));
            if (!isNaN(posX) && !isNaN(posY)) {
              // Check next line radius
              if (i + 2 < lines.length && lines[i + 2].startsWith('Radius:')) {
                var radius = parseFloat(lines[i + 2].substr(7));
                if (!isNaN(radius))
                  xSROMap.AddDrawingShape('Circle', [posX, posY], radius);
                i += 2;
              }
            }
          } else if (
            pos.length == 4 &&
            pos[0].startsWith('X:') &&
            pos[1].startsWith('Y:') &&
            pos[2].startsWith('Z:') &&
            pos[3].startsWith('Region:')
          ) {
            var x = parseFloat(pos[0].substr(2));
            var y = parseFloat(pos[1].substr(2));
            var z = parseFloat(pos[2].substr(2));
            var r = parseFloat(pos[3].substr(7));
            if (!isNaN(x) && !isNaN(y) && !isNaN(z) && !isNaN(r)) {
              // Check next line radius
              if (i + 2 < lines.length && lines[i + 2].startsWith('Radius:')) {
                var radius = parseFloat(lines[i + 2].substr(7));
                if (!isNaN(radius))
                  xSROMap.AddDrawingShape('Circle', [x, y, z, r], radius);
                i += 2;
              }
            }
          }
        }
      }
    }
  } else if (type == 'sBot') {
    // Add paths
    var coords = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('teleport(')) {
        if (coords.length > 2) xSROMap.AddDrawingShape('Polyline', coords);
        coords = [];
      } else if (lines[i].startsWith('go(')) {
        var coord = lines[i].substr(3).split(',');
        if (coord.length == 2) {
          var x = parseFloat(coord[0]);
          var y = parseFloat(coord[1]);
          if (!isNaN(x) && !isNaN(y)) coords.push([x, y]);
        }
      }
    }
    if (coords.length >= 2) xSROMap.AddDrawingShape('Polyline', coords);
  } else if (type == 'mBot') {
    // Add paths
    var coords = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('teleport,')) {
        if (coords.length > 2) xSROMap.AddDrawingShape('Polyline', coords);
        coords = [];
      } else if (lines[i].startsWith('go,')) {
        var coord = lines[i].split(',');
        if (coord.length == 3) {
          var x = parseFloat(coord[1]);
          var y = parseFloat(coord[2]);
          if (!isNaN(x) && !isNaN(y)) coords.push([x, y]);
        }
      }
    }
    if (coords.length >= 2) xSROMap.AddDrawingShape('Polyline', coords);
  } else if (type == 'phBot') {
    // Add paths
    var coords = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('teleport,') || lines[i].startsWith('wait,')) {
        if (coords.length > 2) xSROMap.AddDrawingShape('Polyline', coords);
        coords = [];
      } else if (lines[i].startsWith('walk,')) {
        var coord = lines[i].split(',');
        if (coord.length == 4) {
          var posX = parseFloat(coord[1]);
          var posY = parseFloat(coord[2]);
          if (!isNaN(posX) && !isNaN(posY)) coords.push([posX, posY]);
        } else if (coord.length == 5) {
          var region = parseInt(coord[1]);
          var x = parseFloat(coord[2]);
          var y = parseFloat(coord[3]);
          var z = parseFloat(coord[4]);
          if (region < 0) {
            // phBot synchronization on dungeons
            region += 65535 + 1;
            x = 10 * (x - ((region & 0xff) - 128) * 192);
            y = 10 * (y - ((region >> 8) - 128) * 192);
          }
          if (!isNaN(region) && !isNaN(x) && !isNaN(y) && !isNaN(z))
            coords.push([x, y, z, region]);
        } else if (coord.length == 6) {
          var xsec = parseInt(coord[1]);
          var ysec = parseInt(coord[2]);
          var x = parseFloat(coord[3]);
          var y = parseFloat(coord[4]);
          var z = parseFloat(coord[5]);
          if (
            !isNaN(x) &&
            !isNaN(y) &&
            !isNaN(z) &&
            !isNaN(xsec) &&
            !isNaN(ysec)
          ) {
            var region = (ysec << 8) | xsec;
            coords.push([x, y, z, region]);
          }
        }
      } else if (lines[i].startsWith('AttackArea')) {
        if (coords.length > 0) {
          var lastCoord = coords[coords.length - 1];
          var options = lines[i].split(',');
          var radius = 45; // Silkroad spawn radius 45-65, approx.
          if (options.length >= 2) radius = parseFloat(options[1]);
          xSROMap.AddDrawingShape('Circle', lastCoord, radius);
        }
      }
    }
    if (coords.length >= 2) xSROMap.AddDrawingShape('Polyline', coords);
  } else if (type == 'RSBot') {
    // Add paths
    var coords = [];
    for (var i = 0; i < lines.length; i++) {
      if (lines[i].startsWith('move ')) {
        var data = lines[i].split(' ');
        if (data.length == 6) {
          var x = parseFloat(data[1]);
          var y = parseFloat(data[2]);
          var z = parseFloat(data[3]);
          var xsec = parseInt(data[4]);
          var ysec = parseInt(data[5]);
          if (
            !isNaN(x) &&
            !isNaN(y) &&
            !isNaN(z) &&
            !isNaN(xsec) &&
            !isNaN(ysec)
          ) {
            var region = (ysec << 8) | xsec;
            coords.push([x, y, z, region]);
          }
        }
      }
    }
    if (coords.length >= 2) xSROMap.AddDrawingShape('Polyline', coords);
  }
};
var ExportDrawingLayers = function () {
  var shapes = xSROMap.GetDrawingShapes();
  var textarea = '';

  var type = $('#selectEditorType').val();
  // default type
  if (type.startsWith('--')) type = null;

  for (var id in shapes) {
    var shape = shapes[id];

    // filter and extract script type
    if (type == null) {
      switch (shape.xMap.type) {
        case 'Marker':
          {
            textarea += '> Marker ID:' + shape._leaflet_id + '\n';

            var coord = xSROMap.ConvertLatLngToCoords(shape._latlng);
            textarea +=
              'X:' +
              coord.x +
              ',Y:' +
              coord.y +
              ',Z:' +
              coord.z +
              ',Region:' +
              coord.region +
              '\n';
          }
          break;
        case 'Polyline':
          textarea += '> Polyline:\n';
          var distance = 0;
          var lastCoord;

          for (var i = 0; i < shape._latlngs.length; i++) {
            var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[i]);
            textarea +=
              'X:' +
              coord.x +
              ',Y:' +
              coord.y +
              ',Z:' +
              coord.z +
              ',Region:' +
              coord.region +
              '\n';
            if (coord.posX != null) {
              // calc distance at world map
              if (lastCoord)
                distance += Math.sqrt(
                  Math.pow(lastCoord.posX - coord.posX, 2) +
                    Math.pow(lastCoord.posY - coord.posY, 2)
                );
            } else {
              // calc distance at cave
              if (lastCoord)
                distance +=
                  Math.sqrt(
                    Math.pow(lastCoord.x - coord.x, 2) +
                      Math.pow(lastCoord.y - coord.y, 2)
                  ) / 10;
            }
            lastCoord = coord;
          }

          textarea += 'Total Distance: ' + Math.round(distance, 2) + '\n';
          break;
        case 'Polygon':
          textarea += '> Polygon:\n';
          console.log(shape);

          for (var i = 0; i < shape._latlngs[0].length; i++) {
            var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[0][i]);
            textarea +=
              'X:' +
              coord.x +
              ',Y:' +
              coord.y +
              ',Z:' +
              coord.z +
              ',Region:' +
              coord.region +
              '\n';
          }
          break;
        case 'Circle':
          {
            textarea += '> Circle:\n';

            var coord = xSROMap.ConvertLatLngToCoords(shape._latlng);
            textarea +=
              'X:' +
              coord.x +
              ',Y:' +
              coord.y +
              ',Z:' +
              coord.z +
              ',Region:' +
              coord.region +
              '\n';

            textarea += 'Radius:' + Math.round(shape._mRadius * 192, 2) + '\n';
          }
          break;
      }
    } else if (type == 'sBot') {
      if (shape.xMap.type == 'Polyline') {
        for (var i = 0; i < shape._latlngs.length; i++) {
          var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[i]);
          if (coord.posX != null)
            textarea +=
              'go(' +
              Math.round(coord.posX) +
              ',' +
              Math.round(coord.posY) +
              ')\n';
          //else
          //	textarea += "X:"+coord.x+",Y:"+coord.y+",Z:"+coord.z+",Region:"+coord.region+"\n";
        }
      }
    } else if (type == 'mBot') {
      if (shape.xMap.type == 'Polyline') {
        for (var i = 0; i < shape._latlngs.length; i++) {
          var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[i]);
          if (coord.posX != null)
            textarea +=
              'walk,' +
              Math.round(coord.posX) +
              ',' +
              Math.round(coord.posY) +
              '\n';
          //else
          //	textarea += "X:"+coord.x+",Y:"+coord.y+",Z:"+coord.z+",Region:"+coord.region+"\n";
        }
      }
    } else if (type == 'phBot') {
      switch (shape.xMap.type) {
        case 'Marker':
          {
            textarea += '// Marker - ID:' + shape._leaflet_id + '\n';

            var coord = xSROMap.ConvertLatLngToCoords(shape._latlng);
            if (coord.posX != null)
              textarea +=
                '// PosX:' +
                Math.round(coord.posX) +
                ',PosY:' +
                Math.round(coord.posY) +
                '\n';
            else
              textarea +=
                '// Region:' +
                (coord.region > 32767 ? coord.region - 65536 : coord.region) +
                ',X:' +
                coord.x +
                ',Y:' +
                coord.y +
                ',Z:' +
                coord.z +
                '\n';
          }
          break;
        case 'Polyline':
          var distance = 0;
          var lastCoord;
          var path = '';

          for (var i = 0; i < shape._latlngs.length; i++) {
            var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[i]);
            if (coord.posX != null) {
              path +=
                'walk,' +
                Math.round(coord.posX) +
                ',' +
                Math.round(coord.posY) +
                ',0\n';
              // calc distance at world map
              if (lastCoord)
                distance += Math.sqrt(
                  Math.pow(lastCoord.posX - coord.posX, 2) +
                    Math.pow(lastCoord.posY - coord.posY, 2)
                );
            } else {
              // phBot synchronization on dungeons
              coord['posX'] =
                ((coord.region & 0xff) - 128) * 192 + coord.x / 10;
              coord['posY'] = ((coord.region >> 8) - 128) * 192 + coord.y / 10;
              if (coord.region > 0) coord.region -= 65535 + 1;

              path +=
                'walk,' +
                coord.region +
                ',' +
                Math.round(coord.posX) +
                ',' +
                Math.round(coord.posY) +
                ',' +
                coord.z +
                '\n';
              // calc distance at cave
              if (lastCoord)
                distance += Math.sqrt(
                  Math.pow(lastCoord.x - coord.x, 2) +
                    Math.pow(lastCoord.y - coord.y, 2)
                );
            }
            lastCoord = coord;
          }

          textarea +=
            '// Polyline - Distance:' + Math.round(distance, 2) + '\n' + path;
          break;
        case 'Circle':
          {
            textarea +=
              '// Circle - Radius:' +
              Math.round(shape._mRadius * 192, 2) +
              '\n';

            var coord = xSROMap.ConvertLatLngToCoords(shape._latlng);
            if (coord.posX != null)
              textarea +=
                '// PosX:' +
                Math.round(coord.posX) +
                ',PosY:' +
                Math.round(coord.posY) +
                '\n';
            else
              textarea +=
                '// Region:' +
                (coord.region > 32767 ? coord.region - 65536 : coord.region) +
                ',X:' +
                coord.x +
                ',Y:' +
                coord.y +
                ',Z:' +
                coord.z +
                '\n';
          }
          break;
      }
    } else if (type == 'RSBot') {
      if (shape.xMap.type == 'Polyline') {
        for (var i = 0; i < shape._latlngs.length; i++) {
          var coord = xSROMap.ConvertLatLngToCoords(shape._latlngs[i]);
          xsec = coord.region & 0xff;
          ysec = coord.region >> 8;
          textarea +=
            'move ' +
            Math.round(coord.x) +
            ' ' +
            Math.round(coord.y) +
            ' ' +
            Math.round(coord.z) +
            ' ' +
            xsec +
            ' ' +
            ysec +
            '\n';
        }
      } else if (shape.xMap.type == 'Circle') {
        var coord = xSROMap.ConvertLatLngToCoords(shape._latlng);
        if (coord.posX != null)
          textarea +=
            'area ' +
            Math.round(coord.posX) +
            ' ' +
            Math.round(coord.posY) +
            ' ' +
            Math.floor(shape._mRadius * 192) +
            '\n';
        else
          textarea +=
            'area ' +
            Math.round(coord.x) +
            ' ' +
            Math.round(coord.y) +
            ' ' +
            Math.floor(shape._mRadius * 192) +
            '\n';
      }
    }
  }

  $('#textareaScriptEditor').val(textarea);
};
