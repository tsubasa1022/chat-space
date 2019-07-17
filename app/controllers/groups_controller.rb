class GroupsController < ApplicationController
  def new
    @group = Group.new
    @group.users << current_user
  end

  def create
    @group = Group.new(group_params)
    if @group.save
      redirect_to root_path,  notifications: 'グループを作成しました'
    else
      render :new
    end
  end

  def update
  end

  def edit
  end
  

  private
  def group_params
    params.require(:group).permit(:name, { user_ids: [] })
  end

end
