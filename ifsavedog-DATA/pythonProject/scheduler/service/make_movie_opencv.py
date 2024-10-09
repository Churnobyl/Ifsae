import cv2
import numpy as np
from moviepy.editor import VideoFileClip, AudioFileClip

def bbobbibbobbi(image_name, id):
  # 동영상 기본 설정
  frame_width = 640
  frame_height = 480
  fps = 24
  video_duration = 20  # 10초 길이의 비디오
  total_frames = fps * video_duration  # 총 프레임 수
  output_filename = 'tmp.avi'
  # 이미지 불러오기 (이미지를 resize하여 크기에 맞춤)
#   image = cv2.imread(image_name)
  image = cv2.resize(image_name, (frame_width, frame_height))

  # 비디오 작성기 초기화
  fourcc = cv2.VideoWriter_fourcc(*'XVID')
  out = cv2.VideoWriter(output_filename, fourcc, fps, (frame_width, frame_height))
  # 줌 인/줌 아웃 효과 적용
  for i in range(total_frames):
      # 시간 t 계산 (0에서 1 사이의 값으로)
      t = (i % fps) / (fps//2)  # 1초마다 반복되도록 설정
      
      # 1초마다 줌 인/줌 아웃 반복
      if t < 0.5:
          scale = 1 + 0.5 * t * 2  # 줌 인 (1배에서 1.5배까지)
      else:
          scale = 1.5 - 0.5 * (t - 0.5) * 2  # 줌 아웃 (1.5배에서 다시 1배로)
      
      # 이미지 크기 조절 (확대/축소)
      width = int(frame_width * scale)
      height = int(frame_height * scale)
      resized_image = cv2.resize(image, (width, height))

      # 중앙 위치 계산 및 자르기
      x_offset = (width - frame_width) // 2
      y_offset = (height - frame_height) // 2
      cropped_image = resized_image[y_offset:y_offset + frame_height, x_offset:x_offset + frame_width]

      # 비디오에 프레임 추가
      out.write(cropped_image)

  # 비디오 파일 저장 완료
  out.release()
  cv2.destroyAllWindows()

  output_video_filename = output_filename
  audio_filename = 'audio.mp3'  # 추가할 오디오 파일 경로
  final_output = str(id) + '.mp4'

  # 비디오 클립 불러오기
  video_clip = VideoFileClip(output_video_filename)

  # 오디오 클립 불러오기
  audio_clip = AudioFileClip(audio_filename).subclip(1, 11)

  # 오디오를 비디오에 추가
  video_with_audio = video_clip.set_audio(audio_clip)

  # 최종 동영상 저장
  video_with_audio.write_videofile(final_output, codec='libx264', audio_codec='aac')
  
  return final_output

# 동적 효과 적용
def jjanggoo(image_name, id):
   # 동영상 기본 설정
  frame_width = 640
  frame_height = 480
  fps = 24
  video_duration = 10  # 10초 길이의 비디오
  total_frames = fps * video_duration  # 총 프레임 수
  output_filename = 'tmp.avi' 
  
  # 비디오 작성기 초기화
  fourcc = cv2.VideoWriter_fourcc(*'XVID')
  out = cv2.VideoWriter(output_filename, fourcc, fps, (frame_width, frame_height))
  
  
  # 이미지 불러오기 (이미지를 resize하여 크기에 맞춤)
#   image = cv2.imread(image_name)
  image = cv2.resize(image_name, (frame_width, frame_height))
  
  for i in range(total_frames):
      # 시간 t 계산 (0에서 1 사이의 값으로)
      t = i / (total_frames//8)

      # 1. 회전 효과 (시간에 따라 회전)
      angle = t * 360  # 0도에서 360도까지 회전
      M_rot = cv2.getRotationMatrix2D((frame_width // 2, frame_height // 2), angle, 1)
      rotated_image = cv2.warpAffine(image, M_rot, (frame_width, frame_height))

      # 2. 확대/축소 효과
      scale = 1 + 0.5 * np.sin(t * 2 * np.pi)  # 1배에서 1.5배로 커졌다 작아짐
      resized_image = cv2.resize(rotated_image, None, fx=scale, fy=scale)

      # 3. 이미지 이동 효과 (좌우로 움직임)
      x_shift = int(100 * np.sin(t * 2 * np.pi))
      y_shift = int(100 * np.cos(t * 2 * np.pi))
      M_move = np.float32([[1, 0, x_shift], [0, 1, y_shift]])
      moved_image = cv2.warpAffine(resized_image, M_move, (frame_width, frame_height))

      # 4. 색상 변화 효과 (시간에 따라 색상 변화)
      color_factor = 1 + 0.5 * np.sin(t * 2 * np.pi)
      color_image = (moved_image * color_factor).clip(0, 255).astype(np.uint8)

      # 비디오에 프레임 추가
      out.write(color_image)

  # 비디오 파일 저장 완료
  out.release()
  cv2.destroyAllWindows()
  print(f"Dynamic video saved as {output_filename}")
  
  output_video_filename = output_filename
  audio_filename = 'audio2.mp3'  # 추가할 오디오 파일 경로
  final_output = str(id) + '.mp4'

  # 비디오 클립 불러오기
  video_clip = VideoFileClip(output_video_filename)

  # 오디오 클립 불러오기
  audio_clip = AudioFileClip(audio_filename).subclip(0, 10)

  # 오디오를 비디오에 추가
  video_with_audio = video_clip.set_audio(audio_clip)

  # 최종 동영상 저장
  video_with_audio.write_videofile(final_output, codec='libx264', audio_codec='aac')

  print(f"Video with audio saved as {final_output}")
  
  return final_output


def gausian(image_name, id):
  # 동영상 기본 설정
  frame_width = 640
  frame_height = 480
  fps = 24  # 초당 프레임 수
  video_duration = 10  # 10초 길이의 비디오
  total_frames = fps * video_duration  # 총 프레임 수
  blur_duration = 2.7  # 5초 동안 블러 적용
  blur_frames = fps * blur_duration  # 블러 적용할 총 프레임 수

  output_filename = 'tmp.avi'

  # 이미지 불러오기 (이미지를 resize하여 크기에 맞춤)
#   image = cv2.imread(image_name)
  image = cv2.resize(image_name, (frame_width, frame_height))

  # 비디오 작성기 초기화
  fourcc = cv2.VideoWriter_fourcc(*'XVID')
  out = cv2.VideoWriter(output_filename, fourcc, fps, (frame_width, frame_height))

  # 동영상 생성 (처음 5초 블러, 이후 5초 선명)
  for i in range(total_frames):
      if i < blur_frames:
          # 블러 적용 (가우시안 블러, 커널 사이즈는 (25, 25) 설정)
          blurred_frame = cv2.GaussianBlur(image, (75, 75), 0)
          out.write(blurred_frame)
      else:
          # 블러 제거, 선명한 상태로 전환
          out.write(image)

  # 비디오 파일 저장 완료
  out.release()
  cv2.destroyAllWindows()
  
  output_video_filename = output_filename
  audio_filename = 'audio3.mp3'  # 추가할 오디오 파일 경로
  final_output = str(id) + '.mp4'

  # 비디오 클립 불러오기
  video_clip = VideoFileClip(output_video_filename)

  # 오디오 클립 불러오기
  audio_clip = AudioFileClip(audio_filename).subclip(0, 10)

  # 오디오를 비디오에 추가
  video_with_audio = video_clip.set_audio(audio_clip)

  # 최종 동영상 저장
  video_with_audio.write_videofile(final_output, codec='libx264', audio_codec='aac')

  print(f"Video with audio saved as {final_output}")
  
  return final_output