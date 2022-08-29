export class ClubsError {
  static ALREADY_IN_CLUB =
    '이미 클럽이 존재합니다(하나의 클럽만 속할 수 있습니다)';

  static NOT_FOUND_CLUBS = '클럽을 찾을 수 없습니다';

  static NOT_FOUND_CLUB_MEMBER = '클럽 멤버를 찾을 수 없습니다';

  static ONLY_CLUB_OF_CAPTAIN_CAN_EDIT = '클럽의 리더만 수정이 가능합니다';

  static ONLY_CLUB_OF_CAPTAIN_CAN_DELETE = '클럽의 리더만 삭제가 가능합니다';

  static NOT_FOUND_CLUB_OR_NOT_FOUND_CLUB_MEMBER =
    '클럽이 존재하지 않거나 클럽의 멤버가 존재하지 않습니다';

  static CAN_NOT_BE_DELETED_IF_MEMBER_EXIST =
    '다른 멤버가 존재하면 삭제할 수 없습니다. 캡틴을 위임하고 삭제하세요';
}
