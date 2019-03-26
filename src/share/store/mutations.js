import {setSession} from "@/utils/common";

export const CHANGE_LOADING_BAR = "CHANGE_LOADING_BAR"
const loadQueue = []
export default {
    [CHANGE_LOADING_BAR](state , loadingBarState){
        if (loadingBarState) {
            loadQueue.push(true)
        } else {
            loadQueue.pop()
        }

        state.loading =  loadQueue.length > 0
        if(!state.loading){
            state.loadingText = ''
        }
    },
    setLoadingText(state ,loadingText){
        state.loadingText = loadingText
    },
    setRecordId(state ,id){
        state.recordId = id
    },
    setIsPlaying(state ,isPlaying){
        state.isPlaying = isPlaying
    },
    setIsPlayingRecord(state ,isPlayingRecord){
        state.isPlayingRecord = isPlayingRecord
    },
    setIsStartRecording(state ,isStartRecording){
        state.isStartRecording = isStartRecording
    },
    setShowVideo(state ,showVideo){
        state.showVideo = showVideo
    },
    setopenid(state ,openid){
        state.openid = openid
        setSession('openid' , openid)
    },
    setheadimgurl(state ,headimgurl){
        state.headimgurl = headimgurl
    },
    setnickname(state ,nickname){
        state.nickname = nickname
        setSession('nickname' , nickname)
    },
    setsex(state ,sex){
        state.sex = sex
    },
    settimeline(state ,timeline){
        state.timeline = timeline
        setSession('timeline' , timeline)
    },
    setsignInfo(state ,signInfo){
        state.signInfo = signInfo
    },
    setisConfigedShare(state ,isConfigedShare){
        state.isConfigedShare = isConfigedShare
    },
}
