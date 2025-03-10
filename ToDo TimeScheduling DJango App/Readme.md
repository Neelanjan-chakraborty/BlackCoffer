# To-Do List App Documentation

## Overview

The To-Do List App is a modern Django web application with a sleek dark UI featuring charcoal backgrounds and mint green accents. It allows users to create, read, update, and delete tasks in an intuitive interface.

## Features

- ✅ Create new tasks with title and description
- 📝 View all tasks in an organized list
- 🔄 Update existing tasks
- 🗑️ Delete tasks
- ✓ Mark tasks as completed
- 🌙 Modern dark mode UI with mint green accents
- 📱 Responsive design for all devices

## Technical Stack

- **Backend**: Django 
- **Frontend**: HTML, Tailwind CSS
- **Database**: Django ORM (SQLite by default)

## Project Structure

```
todo_app/
├── migrations/
├── static/
│   └── css/
│       └── styles.css
├── templates/
│   └── todo_app/
│       ├── base.html
│       ├── task_list.html
│       ├── add_task.html
│       └── update_task.html
├── __init__.py
├── admin.py
├── apps.py
├── forms.py
├── models.py
├── tests.py
├── urls.py
└── views.py
```

## Installation & Setup

1. Clone the repository
   ```
   git clone <repository-url>
   cd <project-directory>
   ```

2. Create and activate a virtual environment
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies
   ```
   pip install -r requirements.txt
   ```

4. Run migrations
   ```
   python manage.py migrate
   ```

5. Start the development server
   ```
   python manage.py runserver
   ```

6. Access the application at http://127.0.0.1:8000/

## Core Components

### Models

The app uses a single `Task` model with the following fields:

```python
# Assumed structure based on views.py
class Task(models.Model):
    title = models.CharField(max_length=200)
    description = models.TextField()
    completed = models.BooleanField(default=False)
    # Potentially add date_created and date_updated fields
```

### Forms

The app uses a TaskForm to handle validation and data processing:

```python
# Assumed structure based on views.py
from django import forms
from .models import Task

class TaskForm(forms.ModelForm):
    class Meta:
        model = Task
        fields = ['title', 'description', 'completed']
```

### Views

The application implements five core view functions:

#### 1. task_list

Displays all tasks in the system.

```python
def task_list(request):
    tasks = Task.objects.all()
    return render(request, 'todo_app/task_list.html', {'tasks': tasks})
```

#### 2. add_task

Handles the creation of new tasks.

```python
def add_task(request):
    if request.method == 'POST':
        form = TaskForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('task_list')
    else:
        form = TaskForm()
    return render(request, 'todo_app/add_task.html', {'form': form})
```

#### 3. update_task

Allows editing existing tasks.

```python
def update_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    if request.method == 'POST':
        form = TaskForm(request.POST, instance=task)
        if form.is_valid():
            form.save()
            return redirect('task_list')
    else:
        form = TaskForm(instance=task)
    return render(request, 'todo_app/update_task.html', {'form': form})
```

#### 4. delete_task

Removes a task from the system.

```python
def delete_task(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.delete()
    return redirect('task_list')
```

#### 5. mark_completed

Provides a shortcut to mark a task as completed.

```python
def mark_completed(request, pk):
    task = get_object_or_404(Task, pk=pk)
    task.completed = True
    task.save()
    return redirect('task_list')
```

### URLs

The application defines five URL patterns:

```python
urlpatterns = [
    path('', views.task_list, name='task_list'),
    path('add/', views.add_task, name='add_task'),
    path('update/<int:pk>/', views.update_task, name='update_task'),
    path('delete/<int:pk>/', views.delete_task, name='delete_task'),
    path('mark_completed/<int:pk>/', views.mark_completed, name='mark_completed'),
]
```

## Templates

### Base Template (base.html)

Serves as the foundation for all pages, with a responsive layout and common elements:
- Document structure, meta tags, and CSS imports
- Header with app title
- Footer with copyright information
- Dark theme styling with mint green accents

### Task List (task_list.html)

Displays all tasks with:
- Add task button
- Task cards showing title and description
- Action buttons (Edit, Delete, Mark as Completed)
- Empty state message when no tasks exist

### Add Task (add_task.html)

Form for creating new tasks with:
- Title field (required)
- Description field (required)
- Completed status checkbox
- Save and Cancel buttons

### Update Task (update_task.html)

Form for editing existing tasks with:
- Pre-populated fields with current task data
- Update and Cancel buttons

## UI Design Details

- **Color Scheme**
  - Background: Charcoal black (#121212)
  - Card backgrounds: Dark gray (#1e1e1e)
  - Accents: Mint green (#4ade80)
  - Text: Light gray (#e0e0e0)

- **UI Components**
  - Cards with subtle shadows and rounded corners
  - Hover effects on interactive elements
  - Responsive layout that works on mobile and desktop
  - Status indicators for completed tasks
  - Custom styling for form elements

## Potential Enhancements

- User authentication system
- Task categories or tags
- Due dates for tasks
- Task priority levels
- Search and filter functionality
- Task sorting options
- Dark/light theme toggle
- Task sharing capabilities

## Troubleshooting

Common issues and solutions:

1. **Static files not loading**: Make sure to run `python manage.py collectstatic` and check your `STATIC_URL` and `STATIC_ROOT` settings.

2. **Form validation errors**: Check if your form fields have the correct validation rules.

3. **Database migration issues**: Try running `python manage.py makemigrations` followed by `python manage.py migrate`.

4. **Template rendering problems**: Verify that your context dictionary contains all required variables.

## Contributing

To contribute to this project:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License - see the LICENSE file for details.