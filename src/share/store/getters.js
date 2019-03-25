export default {
    loading: state => state.loading,
    loadingText: state => state.loadingText,
    recordId: state => state.recordId,
    isPlaying: state => state.isPlaying,
    isPlayingRecord: state => state.isPlayingRecord,
    isStartRecording: state => state.isStartRecording,
    base: state => state.base,
    showVideo: state => state.showVideo,
    openid: state => state.openid,
    headimgurl: state => state.headimgurl,
    nickname: state => state.nickname,
    sex: state => state.sex,
    timeline: state => state.timeline,
    signInfo: state => state.signInfo,
    isConfigedShare: state => state.isConfigedShare,
    do:state=>{
        const url = `${state.base}rhythm-select-do.mp3`

        return url
    },
    re:state=>{
        const url = `${state.base}rhythm-select-re.mp3`
        return url
    },
    mi:state=>{
        const url = `${state.base}rhythm-select-mi.mp3`
        return url
    },
    fa:state=>{
        const url = `${state.base}rhythm-select-fa.mp3`
        return url
    },
    sol:state=>{
        const url = `${state.base}rhythm-select-sol.mp3`
        return url
    },
    la:state=>{
        const url = `${state.base}rhythm-select-la.mp3`
        return url
    },
    xi:state=>{
        const url = `${state.base}rhythm-select-xi.mp3`
        return url
    },
}
