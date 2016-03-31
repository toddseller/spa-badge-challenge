class StudentsController < ApplicationController
  def index
    @teachers = Teacher.all
    render :json
  end

  def show
    @teacher = Teacher.find(params[:id])
    if xhr.request?
      respond_to do |format|
        format.json {render json: @teacher}
      end
    end
  end
end
