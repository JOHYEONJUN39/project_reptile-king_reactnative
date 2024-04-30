import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native'
import type { CommentsData } from '../../types/Community'
import axios from 'axios'
import { useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { Octicons } from '@expo/vector-icons'
import FormattedDate from '../common/FormattedDate'
import SubmitButton from '../common/SubmitButton'

interface CommentProps {
  comment: CommentsData
  allComments: CommentsData[]
  postId: number
  updateComments: (newComment: CommentsData) => void
}

const Comment = ({ comment, allComments, postId, updateComments }: CommentProps): JSX.Element => {
  const [replyContent, setReplyContent] = useState('')
  const [showReplyInput, setShowReplyInput] = useState(false)

  const childComments = allComments.filter(c => c.parent_comment_id === comment.id)

  const handleReplySubmit = async (): Promise<void> => {
    if (replyContent.trim() !== null) return
    const postData = {
      post_id: postId,
      content: replyContent,
      parent_comment_id: comment.id
    }
    const token = await AsyncStorage.getItem('authToken')
    try {
      const response = await axios.post<CommentsData>(`http://54.180.158.4:8000/api/posts/${postId}/comments`, postData, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log('대댓글 작성 성공:', response.data)
      setReplyContent('') // 입력 필드 초기화
      setShowReplyInput(!showReplyInput) // 입력창 닫기
      updateComments(response.data)
    } catch (error) {
      console.error('대댓글 작성 실패:', error)
    }
  }

  return (
    <>
        <View style={[styles.commentContainer, { marginLeft: 20 * comment.depth_no }]}>
          <View style={styles.commentInfo}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Image source={{ uri: 'https://mblogthumb-phinf.pstatic.net/MjAyMDEyMjBfMjU4/MDAxNjA4NDUxOTk3Mjk2.W88f9Phe4d6mo48vpWuZQ9e9R4CvARFvZEoBW9irbXYg.UWAbicHtrZc1hrgYt38Fp79LOnbMhQ6_hcttqmEu79gg.JPEG.goodmanddo/%EC%9B%83%EA%B8%B4_%EC%B9%B4%ED%86%A1%ED%94%84%EC%82%AC_%EA%B8%B0%EB%B3%B8.jpg?type=w800' }} style={styles.profileImage} />
              <View style={{ marginLeft: 12 }}>
                <Text style={styles.titleFont}>갈아만든2%</Text>
                <FormattedDate dateString={comment.created_at} style={{ fontSize: 12 }}/>
              </View>
            </View>
            <TouchableOpacity onPress={() => { setShowReplyInput(!showReplyInput) }}>
              <Octicons name="reply" style={styles.replyIcon} />
            </TouchableOpacity>
          </View>
          <Text style={styles.commonFont}>{comment.content}</Text>
        </View>
        {showReplyInput && (
          <View>
            <TextInput
              placeholder="답글 작성..."
              placeholderTextColor='#fff'
              value={replyContent}
              onChangeText={setReplyContent}
              style={[styles.inputContainer, { marginLeft: 20 * comment.depth_no }]}
            />
            <SubmitButton label="작성" onPress={handleReplySubmit} buttonStyle={styles.submitButton}/>
          </View>
        )}
        {childComments.length > 0 && (
          <View>
            {childComments.map(childComment => (
              <Comment key={childComment.id} comment={childComment} allComments={allComments} postId={postId} updateComments={updateComments} />
            ))}
          </View>
        )}
    </>
  )
}

const styles = StyleSheet.create({
  commonFont: {
    color: '#fff',
    fontSize: 14
  },
  titleFont: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold'
  },
  commentContainer: {
    backgroundColor: 'transparent',
    marginVertical: 8,
    padding: 8,
    borderRadius: 10,
    borderColor: '#39823E',
    borderWidth: 2
  },
  replyIcon: {
    marginLeft: 10,
    fontSize: 18,
    color: '#fff'
  },
  commentInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 25
  },
  inputContainer: {
    height: 40,
    color: '#fff',
    borderColor: '#39823E',
    borderWidth: 2,
    borderRadius: 8,
    padding: 8
  },
  submitButton: {
    width: 60,
    height: 35,
    backgroundColor: '#39823E',
    borderRadius: 5,
    paddingVertical: 0,
    paddingHorizontal: 0,
    marginVertical: 8,
    alignSelf: 'flex-end',
    borderColor: '#39823E',
    borderWidth: 2
  }
})

export default Comment
