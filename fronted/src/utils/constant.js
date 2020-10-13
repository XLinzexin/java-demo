/*
 * @params {relateMap},通过createRelateMap创建的对象;{mainTarget},第一级map的value;{secondTarget},第二级map的value
 * @returns {String} 返回关联的值
 * @desc: 当constantMap有两级相互关联，计算出关联的值
 */
const getCalculateConstantVal = function(mainKey, secondKey) {
  return this.maps[mainKey][secondKey];
};
const getCalculateConstantKey = function(val) {
  let mainKey, secondKey;
  for (let k in this.maps) {
    const mainMap = this.maps[k];
    let hasSame = false;
    for (let j in mainMap) {
      if (mainMap[j] === val) {
        hasSame = true;
        secondKey = j;
        break;
      }
    }
    if (hasSame) {
      mainKey = k;
      break;
    }
  }
  return function(callback) {
    callback(mainKey, secondKey);
  };
};
/*
 * @params: {Object}
 * @returns {Object}
 * @desc: 处理多个map的关联
 */
const createRelateMap = function(maps) {
  let mainMap = { has: {} };
  let secondMap = {};
  for (let k in maps) {
    mainMap[k] = k;
    mainMap.has[k] = {};
    for (let i in maps[k]) {
      mainMap.has[k][maps[k][i]] = true;
    }
    for (let j in maps[k]) {
      secondMap[j] = j;
    }
  }
  let secondMapHas = {};
  for (let k in secondMap) {
    secondMapHas[k] = {};
    for (let i in maps) {
      const key = maps[i][k];
      if (key) {
        secondMapHas[k][key] = true;
      }
    }
  }
  secondMap.has = secondMapHas;
  return function(mainTarget, secondTarget) {
    return {
      [mainTarget]: mainMap,
      [secondTarget]: secondMap,
      maps,
      // TODO: 拼写错误
      transferKeyToValue: getCalculateConstantVal,
      transferValueToKey: getCalculateConstantKey,
    };
  };
};

/*
 * @params {Objects},多个对象
 * @returns {Object}
 * @desc: 用于合并变量对象的，并去除all属性
 */
const concatMap = function() {
  let originMap = {};
  for (let map of arguments) {
    originMap = Object.assign(originMap, map);
  }
  delete originMap.all;
  return originMap;
};

// 素材的所有文章类型
export const MATERIAL_ARTICLE = {
  all:
    'standardArticle,lbsArticle,personalArticle,redirectArticle,wechatArticle,templateMessage',
  groupArticle:
    'standardArticle,lbsArticle,personalArticle,redirectArticle,wechatArticleItem,storeArticle',
  standardArticle: 'standardArticle', // 标准文章
  lbsInformation: 'lbsArticle', // LBS消息
  personalizedArticle: 'personalArticle', // 个性化文章
  externalLinkArticle: 'redirectArticle',
  wechatArticle: 'wechatArticle', // 微信文章
  wechatArticleItem: 'wechatArticleItem', // 微信文章（单篇）
  storeArticle: 'storeArticle', // 店铺文章
  templateMessage: 'templateMessage', // 模板消息
};
// 素材的所有永久媒体
export const MATERIAL_MEDIA_PERMANENT = {
  all: 'permanentAudio,permanentImage,permanentVideo',
  audio: 'permanentAudio',
  image: 'permanentImage',
  video: 'permanentVideo',
};
// 素材的所有本地媒体
export const MATERIAL_MEDIA_LOCAL = {
  all: 'localAudio,localImage,localVideo',
  audio: 'localAudio',
  image: 'localImage',
  video: 'localVideo',
};
// 素材的所有临时媒体
export const MATERIAL_MEDIA_TEMPORARY = {
  all: 'all_temporary_media',
  audio: 'temporary_audio',
  image: 'temporary_image',
  video: 'temporary_video',
};
export const BROADCAST_TYPE = {
  standard: 'standard',
  timeLimit: '48-hours',
  template: 'template',
};
export const MATERIAL_MEDIA = createRelateMap({
  local: MATERIAL_MEDIA_LOCAL,
  permanent: MATERIAL_MEDIA_PERMANENT,
  temporary: MATERIAL_MEDIA_TEMPORARY,
})('MATERIAL_STORE_TYPE', 'MATERIAL_FILE_TYPE');
// 全部的类型，用于所有素材选择
export const MATERIAL_ALL_TYPE = {
  ...concatMap(MATERIAL_ARTICLE, MATERIAL_MEDIA_PERMANENT),
  text: 'text',
  miniprogram: 'miniprogram',
  wechatTemplateMessage: 'wechatTemplateMessage',
  linkMessage: 'link_message',
};

export const MATERIAL__LOCALE_TYPE = {
  default: 'locale_sid',
};

export const CONTENT_TYPE = {
  officialAccount: 'officialAccount',
};

/**
 * 返回码统一归类
 * @reference: https://chatly.atlassian.net/wiki/spaces/CD/pages/486178827
 */
export const SUCCESS_CODE = '00000';

// A 表示错误来源于用户
export const USER_CODE = {
  PARAMS_ERROR: 'A0400',
  UN_LOGIN: 'A0401',
  UN_AUTH: 'A0403',
};

// B 表示错误来源于当前系统
export const SYSTEM_CODE = {
  DEFAULT_FAIL: 'B0001',
};

// C 表示错误来源 于第三方服务
export const SERVICE_CODE = {};
